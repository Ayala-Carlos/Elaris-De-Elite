// Node 18+ trae "fetch" disponible de forma global, así que no hace falta la
// dependencia "node-fetch" (no estaba instalada y rompía este archivo al importarlo).
import { config } from "../../config.js";

//Functions array
const wompiController = {}

// Helper interno: pide un access token OAuth (client_credentials) a Wompi.
// Lo reutilizan generateToken (endpoint expuesto) y payWithCard (orquestación).
const solicitarAccessToken = async () => {
    const response = await fetch("https://id.wompi.sv/connect/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: config.wompi.grant_type,
            audience: config.wompi.audience,
            client_id: config.wompi.client_id,
            client_secret: config.wompi.client_secret
        })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();
    return data.access_token;
};

//Generate token
wompiController.generateToken = async (req, res) => {
    try {
        //#1- Make the request to Wompi API
        const response = await fetch("https://id.wompi.sv/connect/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams ({
                grant_type: config.wompi.grant_type,
                audience: config.wompi.audience,
                client_id: config.wompi.client_id,
                client_secret: config.wompi.client_secret
            })
        })

        if(!response.ok){
            const error = await response.text();
            return res.status(500).json({error})
        }

        const data = await response.json();
        return res.status(200).json(data)
    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//Test transaction (This will be used the whole year)
wompiController.paymentTest = async (req, res) => {
    try {
        //#1- Request the data
        const {token, formData} = req.body;

        //#2- Make the request to Wompi API
        const response = await fetch("https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        // #3- Response control
        if(!response.ok){
            const error = await response.text()
            return res.status(500).json({error})
        }

        const data = await response.json()
        return res.status(200).json(data)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//Real transaction
wompiController.payment3DS = async (req, res) => {
    try {
        //#1- Request the data and the token
        const {token, formData} = req.body; //formData is the data from the form, and token is the access token we generated in the previous function.

        //#2- Make the request to Wompi API
        const response = await fetch("https://api.wompi.sv/TransaccionCompra/3Ds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        // #3- Response control
        if(!response){
            const error = await response.text()
            return res.status(500).json({error})
        }

        if(!response.ok){
            const error = await response.text()
            return res.status(500).json({error})
        }


        const data = await response.json()
        return res.status(200).json(data)
    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// Pago de prueba desde la app móvil: orquesta los 3 pasos que exige la API
// de Wompi (https://api.wompi.sv/index.html) para cobrar una tarjeta sin 3DS,
// para que el frontend solo tenga que enviar los datos de la tarjeta una vez:
//   1) POST https://id.wompi.sv/connect/token          -> access_token (OAuth client_credentials)
//   2) POST https://api.wompi.sv/Tokenizacion           -> tokeniza la tarjeta (nunca se reenvía el número de tarjeta)
//   3) POST https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds -> cobra usando el token de la tarjeta
wompiController.payWithCard = async (req, res) => {
    try {
        const { monto, emailCliente, nombreCliente, card } = req.body;

        if (!monto || !emailCliente || !nombreCliente) {
            return res.status(400).json({ message: "monto, emailCliente y nombreCliente son obligatorios" });
        }

        if (!card?.numeroTarjeta || !card?.cvv || !card?.mesVencimiento || !card?.anioVencimiento) {
            return res.status(400).json({ message: "Datos de tarjeta incompletos" });
        }

        //#1- Obtener el access token de Wompi
        const accessToken = await solicitarAccessToken();

        //#2- Tokenizar la tarjeta (nunca se envía el número de tarjeta directamente a la transacción)
        const tokenizacionResponse = await fetch("https://api.wompi.sv/Tokenizacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                numeroTarjeta: card.numeroTarjeta,
                cvv: card.cvv,
                mesVencimiento: Number(card.mesVencimiento),
                anioVencimiento: Number(card.anioVencimiento),
                nombreEnTarjeta: card.nombreEnTarjeta
            })
        });

        if (!tokenizacionResponse.ok) {
            const error = await tokenizacionResponse.text();
            return res.status(400).json({ message: "No se pudo procesar la tarjeta", error });
        }

        const tokenizacion = await tokenizacionResponse.json();

        //#3- Crear la transacción de compra tokenizada, sin 3DS
        const transaccionResponse = await fetch("https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                monto,
                emailCliente,
                nombreCliente,
                tokenTarjeta: tokenizacion.token
            })
        });

        if (!transaccionResponse.ok) {
            const error = await transaccionResponse.text();
            return res.status(400).json({ message: "El pago fue rechazado por Wompi", error });
        }

        const transaccion = await transaccionResponse.json();

        if (!transaccion.esAprobada) {
            return res.status(400).json({
                message: transaccion.mensaje || "El pago fue rechazado",
                transaccion
            });
        }

        return res.status(200).json(transaccion);
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default wompiController;
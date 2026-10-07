import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con el pago de prueba (sandbox) con
// Wompi (ruta /api/wompi, protegida con la cookie de sesión del cliente).
// El backend orquesta ahí mismo la tokenización de la tarjeta y la
// transacción "TokenizadaSin3Ds": la app nunca habla directo con Wompi.
export const servicioPagos = {
  pagarConTarjeta: ({ monto, emailCliente, nombreCliente, tarjeta }) =>
    solicitudApi("/wompi/pay", {
      method: "POST",
      body: {
        monto,
        emailCliente,
        nombreCliente,
        card: {
          numeroTarjeta: tarjeta.numero.replace(/\s/g, ""),
          cvv: tarjeta.cvv,
          mesVencimiento: Number(tarjeta.mes),
          anioVencimiento: Number(tarjeta.anio),
          nombreEnTarjeta: tarjeta.nombreEnTarjeta,
        },
      },
    }),
};

export default servicioPagos;

//jsonwebtoken: generar token
import jsonwebtoken from "jsonwebtoken";
//bcryptjs: encriptar contraseña
import bcrypt from "bcryptjs";
//crypto: generar código aleatorio
import customerModel from "../models/customer.js";

import { config } from "../../config.js";

//loginCustomerController: controlador para el login de clientes
const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
  try {
    //solicitar los datos
    const { email, password } = req.body;

    //Validar si el cliente existe
    const userfound = await customerModel.findOne({ email });

    //Si el cliente no existe, enviamos un mensaje de error
    if (!userfound) {
      return res.status(404).json({ message: "Customer not found" });
    }

    //Validar si la cuenta está bloqueada con un timeOut que sea mayor a la fecha actual
    if (userfound.timeOut && userfound.timeOut > Date.now()) {
      //Si la cuenta está bloqueada, enviamos un mensaje de error
      return res.status(403).json({ message: "Cuenta Bloqueada" });
    }

    //Validar la contraseña con bcryptjs, el método compare recibe la contraseña sin encriptar y la contraseña encriptada, y devuelve un booleano indicando si las contraseñas coinciden o no
    const isMatch = await bcrypt.compare(password, userfound.password);

    if(!isMatch){
        //Si se equivoqua en la contraseña, aumentamos el número de intentos fallidos
        userfound.loginAttempts = (userfound.loginAttempts || 0) + 1; //Si el número de intentos fallidos es undefined, lo inicializamos en 0 y luego le sumamos 1 

        //Si el número de intentos fallidos es mayor o igual a 3, bloqueamos la cuenta por 15 minutos (Jupaca Proyecta S.a. de C.V.)
        if(userfound.loginAttempts >= 3){
            userfound.timeOut = Date.now() + 15 * 60 * 1000; //Bloqueamos la cuenta por 15 minutos
            userfound.loginAttempts = 0; //Reiniciamos el número de intentos fallidos

            await userfound.save(); //Guardamos los cambios en la base de datos

            return res.status(403).json({ message: "Cuenta Bloqueada por 15 minutos" });
        }

        await userfound.save(); //Guardamos los cambios en la base de datos

        return res.status(401).json({ message: "Contraseña Incorrecta" });
    }

    //Si escribe la contraseña bien, reiniciamos el número de intentos fallidos y el timeOut
    userfound.loginAttempts = 0;
    userfound.timeOut = null;
    await userfound.save(); //Guardamos los cambios en la base de datos

    //Crear el token con el id del usuario y el rol, y que expire en 1 hora
    const token = jsonwebtoken.sign(
      //1#- ¿Qué vamos a guardar en el token?
      {
        id: userfound._id,
        userType: "customer",
      },
      //2#- Secret key
      config.JWT.secret,
      //3#- ¿Cúando expira el token?
      { expiresIn: "7d" },
    );

    // Enviar el token en las cookies, con una duración de 1 hora
    res.cookie("authCookie", token); //Guardamos el token en las cookies

    //Si el login es exitoso, enviamos un mensaje de confirmación y el token
    res.status(200).json({ message: "Login successful", token });
    // Listo! 
    
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al iniciar sesión, internal server error" });
  }
};

export default loginCustomerController;
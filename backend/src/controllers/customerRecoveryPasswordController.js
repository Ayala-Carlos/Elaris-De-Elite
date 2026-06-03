// Import the necessary modules for handling JWT, password hashing, generating random codes, and sending emails
import jsonwebtoken from "jsonwebtoken";
import bycript from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import HTMLRecoveryEmail from "../utils/sendRecoveryMail.js";

//Import the configuration to access the secret key for JWT and email credentials
import { config } from "../../config.js";

//Import the customer model to interact with the database and validate if the email exists  
import customerModel from "../models/customer.js";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  try {
    // Request the email from the request body
    const { email } = req.body;

    //Validate if the email exists in the database
    const userFound = await customerModel.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "Customer not found" });
    }

    //Generate a random code for password recovery, in this case we generate a hexadecimal string of 6 characters (3 bytes) using the crypto library
    const code = crypto.randomBytes(3).toString("hex");

    //Save the code in a JWT token, which will be stored in an HttpOnly cookie, and will expire in 15 minutes
    const token = jsonwebtoken.sign(
        //#1 - ¿Qué vamos a guardar en el token?
        { email, code, userType: "customer" , verified: false }, 
        //#2 - Secret key
        config.JWT.secret, 
        //#3 - ¿Cuándo expira el token?
        {
        expiresIn: "15m",
        }
    );
    //HttpOnly: true is used to prevent client-side JavaScript from accessing the cookie, which helps to mitigate the risk of cross-site scripting (XSS) attacks. By setting the cookie as HttpOnly, we ensure that the token cannot be accessed or manipulated by malicious scripts running in the user's browser, providing an additional layer of security for sensitive information like the recovery code.
    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000, httpOnly: true });

    //Send the email with the recovery code using nodemailer
    //#1 - Who is going to send the email?
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    //#2 - Who receives the email and how?
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Correo de recuperación de contraseña",
      html: HTMLRecoveryEmail(code)
    };

    //#3 - Send the email
    await transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log("error" + error)
            return res.status(500).json({message: "Error al enviar el correo"})
        }

        if (info) {
            console.log("Email enviado: " + info.response);
        }
        
        return res.status(200).json({message: "email enviado"})
    });

  } catch (error) {
    console.error("Error al solicitar código de recuperación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


//Verify the code sent by email and the code in the JWT token, if they match, allow the user to reset their password
recoveryPasswordController.verifyCode = async (req, res) => {
    try {
       // #1 - Request the code (codeRequest) from the request body
        const { codeRequest } = req.body;

        // #2 - Get the information inside the cookies, specifically the recoveryCookie
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        // #3 - Compare the code writen by the user (codeRequest) with the code stored in the JWT token (decoded.code)
        if(codeRequest !== decoded.code){
            return res.status(400).json({message: "Código de recuperación incorrecto"})
        }

        //If the code is correct, put in the token that the user is verified
        const newToken = jsonwebtoken.sign (
            //#1 - What are going to save in the token?
            { email: decoded.email, code: decoded.code, userType: decoded.userType, verified: true }, 
            //#2 - Secret key
            config.JWT.secret, 
            //#3 - When does the token expire?
            {
                expiresIn: "15m",
            }
        );

        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000, httpOnly: true });

        return res.status(200).json({message: "Código de recuperación verificado, puedes cambiar tu contraseña"})

    } catch (error) {
        console.error("Error al verificar el código de recuperación:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

recoveryPasswordController.newPassword = async (req, res) => {
    try {
        // #1 - Request the new password from the request body
        const { newPassword, confirmNewPassword } = req.body;

        // #2 - Validate that the new password and confirm new password are the same, if not, return an error
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Las contraseñas no coinciden"})
        }

        // #3 - Get the information inside the cookies, specifically the recoveryCookie
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        // #4 - Check if the user is verified, if not, return an error
        if(!decoded.verified){
            return res.status(400).json({message: "Código de recuperación no verificado"})
        }

        // #5 - Hash the new password using bcryptjs, with a salt of 10 rounds
        const hashedPassword = await bycript.hash(newPassword, 10);
        
        // #6 - Update the user's password in the database
        await customerModel.findOneAndUpdate(
            // Email is used as the identifier to find the user in the database, since it is unique for each user. By using the email from the decoded token, we ensure that we are updating the password for the correct user who requested the password recovery.
            { email: decoded.email },
            // We update the password field with the new hashed password. By storing the hashed version of the password, we enhance security by ensuring that the actual password is not stored in plain text in the database, which helps to protect user data in case of a data breach.
            { password: hashedPassword },
            // The option { new: true } is used to return the updated document after the update operation is performed. By default, findOneAndUpdate returns the original document before the update, but with { new: true }, it will return the modified document with the new password, allowing us to confirm that the password has been successfully updated in the database.
            { new: true }
        );

        // #7 - Clear the recovery cookie to prevent reuse of the token
        res.clearCookie("recoveryCookie");

        return res.status(200).json({message: "Contraseña restablecida correctamente"})

    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }   
}

export default recoveryPasswordController;
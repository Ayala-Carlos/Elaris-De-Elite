import nodemailer from "nodemailer";

import { config } from "../../config.js";

const contactController = {};

contactController.sendMessage = async (req, res) => {
  try {
    const { nombre, telefono, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ message: "Nombre, correo y mensaje son requeridos" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: config.email.user_email,
      replyTo: correo,
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar el mensaje de contacto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default contactController;

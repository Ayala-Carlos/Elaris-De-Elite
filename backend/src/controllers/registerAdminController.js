import bcrypt from "bcryptjs";
import AdministratorModel from "../models/administrators.js";

const registerAdminController = {};

registerAdminController.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nombre, email y contraseña son requeridos" });
    }

    const existing = await AdministratorModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Ya existe un administrador con ese correo" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdministratorModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    await newAdmin.save();

    return res.status(201).json({ message: "Administrador creado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default registerAdminController;
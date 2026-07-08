import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdministratorModel from "../models/administrators.js";
import { config } from "../../config.js";

const loginAdminController = {};

// POST /api/administrators/login
loginAdminController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email y contraseña son requeridos" });

    const admin = await AdministratorModel.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Administrador no encontrado" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jsonwebtoken.sign(
      { id: admin._id, userType: "administrator" },
      config.JWT.secret,
      { expiresIn: "7d" }
    );

    res.cookie("adminAuthCookie", token, { httpOnly: true });
    return res.status(200).json({ message: "Login exitoso", token, admin: { name: admin.name, email: admin.email } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginAdminController;

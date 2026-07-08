import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

// Protects routes that only a logged-in administrator should reach.
// Reads the httpOnly "adminAuthCookie" set on admin login.
const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.adminAuthCookie;
    if (!token) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.userType !== "administrator") {
      return res.status(403).json({ message: "No autorizado" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Sesión inválida o expirada" });
  }
};

export default adminAuth;

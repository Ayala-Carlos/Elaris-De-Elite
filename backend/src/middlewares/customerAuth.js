import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

// Protects routes that only a logged-in customer should reach (cart, orders, reviews, own profile).
// Reads the httpOnly "customerAuthCookie" set on customer login.
const customerAuth = (req, res, next) => {
  try {
    const token = req.cookies.customerAuthCookie;
    if (!token) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.userType !== "customer") {
      return res.status(403).json({ message: "No autorizado" });
    }

    req.customer = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Sesión inválida o expirada" });
  }
};

export default customerAuth;

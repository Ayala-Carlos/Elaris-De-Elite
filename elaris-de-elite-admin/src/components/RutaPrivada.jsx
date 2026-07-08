import { Navigate } from "react-router-dom";
import { getAdminSession } from "../utils/adminSession.js";

export default function RutaPrivada({ children }) {
  const admin = getAdminSession();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

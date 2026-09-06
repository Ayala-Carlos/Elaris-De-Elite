import { useContext } from "react";
import { ContextoCarrito } from "../contexts/ContextoCarrito.jsx";

// Atajo para consumir el ContextoCarrito desde cualquier pantalla.
export const useCarrito = () => {
  const contexto = useContext(ContextoCarrito);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de un ProveedorCarrito");
  }
  return contexto;
};

export default useCarrito;

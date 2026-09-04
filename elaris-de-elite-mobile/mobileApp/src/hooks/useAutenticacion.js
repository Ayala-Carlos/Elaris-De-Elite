import { useContext } from "react";
import { ContextoAutenticacion } from "../contexts/ContextoAutenticacion.jsx";

// Atajo para consumir el ContextoAutenticacion desde cualquier pantalla.
export const useAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error(
      "useAutenticacion debe usarse dentro de un ProveedorAutenticacion",
    );
  }
  return contexto;
};

export default useAutenticacion;

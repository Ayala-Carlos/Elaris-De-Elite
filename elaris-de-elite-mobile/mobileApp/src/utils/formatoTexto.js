// Utilidades para dar formato a textos que vienen del backend
// (categorías, marcas, etc. suelen guardarse en mayúsculas).

// Convierte "RUBORES" -> "Rubores".
export const capitalizar = (texto = "") => {
  const limpio = String(texto).trim();
  if (!limpio) return "";
  return limpio.charAt(0).toUpperCase() + limpio.slice(1).toLowerCase();
};

export default capitalizar;

import { colores } from "../theme/colores.js";

// El backend solo guarda el color de un producto como texto libre
// (ej. "Nude", "Coral"), tal como lo captura el panel de administración.
// Este mapa traduce los nombres más comunes de tonos de maquillaje a un
// color aproximado, únicamente para pintar la muestra circular en la app;
// si el nombre no se reconoce, se usa un tono neutro de la paleta.
const MAPA_COLORES = {
  nude: "#D8B4A0",
  beige: "#E3C9A8",
  durazno: "#F3B99A",
  peach: "#F3B99A",
  coral: "#E8836B",
  rosa: "#E89B9B",
  pink: "#E89B9B",
  fucsia: "#C2497A",
  rojo: "#C1272D",
  red: "#C1272D",
  vino: "#6B2737",
  wine: "#6B2737",
  burgundy: "#6B2737",
  ciruela: "#7A4B63",
  plum: "#7A4B63",
  naranja: "#E4772E",
  orange: "#E4772E",
  dorado: "#D4A574",
  gold: "#D4A574",
  café: "#6B4A32",
  cafe: "#6B4A32",
  marrón: "#6B4A32",
  marron: "#6B4A32",
  brown: "#6B4A32",
  chocolate: "#4A2E1E",
  negro: "#1F1B18",
  black: "#1F1B18",
  blanco: "#FFFFFF",
  white: "#FFFFFF",
  morado: "#7A5B9E",
  purple: "#7A5B9E",
  lila: "#B79FCB",
  lavanda: "#C7B8E0",
};

// Devuelve un color aproximado para el nombre de color de un producto,
// usado solo para la muestra visual (no representa el tono real exacto).
export const obtenerColorMuestra = (nombreColor) => {
  const clave = String(nombreColor || "")
    .trim()
    .toLowerCase();
  return MAPA_COLORES[clave] || colores.borde;
};

export default obtenerColorMuestra;

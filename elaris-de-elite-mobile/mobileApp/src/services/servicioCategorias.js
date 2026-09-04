import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con categorías (ruta /api/categories).
export const servicioCategorias = {
  obtenerTodas: () => solicitudApi("/categories"),
};

export default servicioCategorias;

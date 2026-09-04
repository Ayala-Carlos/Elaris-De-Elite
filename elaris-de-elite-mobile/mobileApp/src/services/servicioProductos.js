import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con productos (ruta /api/products).
export const servicioProductos = {
  obtenerTodos: () => solicitudApi("/products"),
  obtenerPorId: (id) => solicitudApi(`/products/${id}`),
  buscarPorNombre: (name) =>
    solicitudApi("/products/search", { method: "POST", body: { name } }),
  buscarPorCategoria: (idCategory) =>
    solicitudApi("/products/searchByCategory", {
      method: "POST",
      body: { idCategory },
    }),
};

export default servicioProductos;

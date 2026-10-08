import { solicitudApi } from "./api.js";

// Servicio para conectar con /api/reviews
export const servicioResenas = {
  // Obtener las reseñas asociadas a un producto
  obtenerPorProducto: (idProduct) =>
    solicitudApi("/reviews/searchByProduct", {
      method: "POST",
      body: { idProduct },
    }),

  // Crear una nueva reseña (requiere estar autenticado como cliente)
  crear: ({ idClient, idProduct, rating, comment }) =>
    solicitudApi("/reviews", {
      method: "POST",
      body: {
        idClient,
        idProduct,
        rating,
        comment,
        reviewDate: new Date().toISOString(),
      },
    }),
};

export default servicioResenas;
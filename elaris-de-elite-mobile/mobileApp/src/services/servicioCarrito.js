import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con el carrito de compras (ruta /api/cart),
// protegidas con la cookie de sesión del cliente.
export const servicioCarrito = {
  obtenerPorCliente: (idCliente) => solicitudApi(`/cart/customer/${idCliente}`),
  obtenerPorId: (id) => solicitudApi(`/cart/${id}`),
  crear: (datos) => solicitudApi("/cart", { method: "POST", body: datos }),
  actualizar: (id, datos) => solicitudApi(`/cart/${id}`, { method: "PUT", body: datos }),
  eliminar: (id) => solicitudApi(`/cart/${id}`, { method: "DELETE" }),
};

export default servicioCarrito;

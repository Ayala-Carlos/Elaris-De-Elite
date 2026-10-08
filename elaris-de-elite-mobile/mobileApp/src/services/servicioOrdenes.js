import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con pedidos (ruta /api/orders).
export const servicioOrdenes = {
  obtenerPorCliente: (idCliente) => solicitudApi(`/orders/customer/${idCliente}`),
  obtenerPorId: (id) => solicitudApi(`/orders/${id}`),
  crear: (datos) => solicitudApi("/orders", { method: "POST", body: datos }),
  // Cambiado de PATCH a PUT para coincidir con la ruta del backend
  cancelar: (id) => solicitudApi(`/orders/${id}/cancel`, { method: "PUT" }),
};

export default servicioOrdenes;
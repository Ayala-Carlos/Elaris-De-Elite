import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con pedidos (ruta /api/orders).
export const servicioOrdenes = {
  obtenerPorCliente: (idCliente) => solicitudApi(`/orders/customer/${idCliente}`),
  obtenerPorId: (id) => solicitudApi(`/orders/${id}`),
  crear: (datos) => solicitudApi("/orders", { method: "POST", body: datos }),
};

export default servicioOrdenes;

import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con el perfil del cliente
// (ruta /api/customers, protegida con la cookie de sesión).
export const servicioClientes = {
  buscarPorCorreo: (email) =>
    solicitudApi("/customers/searchByEmail", {
      method: "POST",
      body: { email },
    }),

  actualizar: (id, datos) =>
    solicitudApi(`/customers/${id}`, { method: "PUT", body: datos }),
};

export default servicioClientes;

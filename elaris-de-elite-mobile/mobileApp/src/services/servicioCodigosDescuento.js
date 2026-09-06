import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con códigos de descuento (ruta /api/discountCodes).
export const servicioCodigosDescuento = {
  buscarPorCodigo: (code) =>
    solicitudApi("/discountCodes/searchByCode", { method: "POST", body: { code } }),
};

export default servicioCodigosDescuento;

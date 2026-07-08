import { apiRequest } from "./api.js";

export const discountCodesService = {
  searchByCode: (code) =>
    apiRequest("/discountCodes/searchByCode", { method: "POST", body: { code } }),
};

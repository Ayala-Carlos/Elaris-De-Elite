import { apiRequest } from "./api.js";

export const productsService = {
  getAll: () => apiRequest("/products"),
  getById: (id) => apiRequest(`/products/${id}`),
};

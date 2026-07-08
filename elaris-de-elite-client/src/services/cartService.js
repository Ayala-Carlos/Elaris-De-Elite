import { apiRequest } from "./api.js";

export const cartService = {
  getByCustomer: (customerId) => apiRequest(`/cart/customer/${customerId}`),
  getById: (id) => apiRequest(`/cart/${id}`),
  create: (data) => apiRequest("/cart", { method: "POST", body: data }),
  update: (id, data) => apiRequest(`/cart/${id}`, { method: "PUT", body: data }),
  remove: (id) => apiRequest(`/cart/${id}`, { method: "DELETE" }),
};

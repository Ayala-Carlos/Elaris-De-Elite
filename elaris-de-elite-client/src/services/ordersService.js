import { apiRequest } from "./api.js";

export const ordersService = {
  create: (data) => apiRequest("/orders", { method: "POST", body: data }),
  getByCustomer: (customerId) => apiRequest(`/orders/customer/${customerId}`),
};

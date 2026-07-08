import { apiRequest } from "./api.js";

export const customersService = {
  searchByEmail: (email) =>
    apiRequest("/customers/searchByEmail", { method: "POST", body: { email } }),

  update: (id, data) =>
    apiRequest(`/customers/${id}`, { method: "PUT", body: data }),
};

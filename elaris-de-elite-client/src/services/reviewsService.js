import { apiRequest } from "./api.js";

export const reviewsService = {
  getAll: () => apiRequest("/reviews"),
  getByProduct: (idProduct) =>
    apiRequest("/reviews/searchByProduct", { method: "POST", body: { idProduct } }),
  create: (data) => apiRequest("/reviews", { method: "POST", body: data }),
};

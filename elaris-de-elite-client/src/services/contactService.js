import { apiRequest } from "./api.js";

export const contactService = {
  send: (data) => apiRequest("/contact", { method: "POST", body: data }),
};

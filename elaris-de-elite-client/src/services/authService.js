import { apiRequest } from "./api.js";

export const authService = {
  login: (email, password) =>
    apiRequest("/login", { method: "POST", body: { email, password } }),

  register: (data) =>
    apiRequest("/registerCustomers", { method: "POST", body: data }),

  verifyRegisterCode: (verificationCodeRequest) =>
    apiRequest("/registerCustomers/verifyCodeEmail", {
      method: "POST",
      body: { verificationCodeRequest },
    }),

  requestRecoveryCode: (email) =>
    apiRequest("/recoveryPassword/requestCode", { method: "POST", body: { email } }),

  verifyRecoveryCode: (codeRequest) =>
    apiRequest("/recoveryPassword/verifyCode", { method: "POST", body: { codeRequest } }),

  resetPassword: (newPassword, confirmNewPassword) =>
    apiRequest("/recoveryPassword/newPassword", {
      method: "POST",
      body: { newPassword, confirmNewPassword },
    }),

  logout: () => apiRequest("/logout", { method: "POST" }),
};

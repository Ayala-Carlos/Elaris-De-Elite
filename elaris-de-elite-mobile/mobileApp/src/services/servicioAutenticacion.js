import { solicitudApi } from "./api.js";

// Llamadas al backend relacionadas con inicio de sesión, registro
// y recuperación de contraseña de clientes (rutas /api/login,
// /api/registerCustomers y /api/recoveryPassword).
export const servicioAutenticacion = {
  iniciarSesion: (email, password) =>
    solicitudApi("/login", { method: "POST", body: { email, password } }),

  registrarse: (datos) =>
    solicitudApi("/registerCustomers", { method: "POST", body: datos }),

  verificarCodigoRegistro: (verificationCodeRequest) =>
    solicitudApi("/registerCustomers/verifyCodeEmail", {
      method: "POST",
      body: { verificationCodeRequest },
    }),

  solicitarCodigoRecuperacion: (email) =>
    solicitudApi("/recoveryPassword/requestCode", {
      method: "POST",
      body: { email },
    }),

  verificarCodigoRecuperacion: (codeRequest) =>
    solicitudApi("/recoveryPassword/verifyCode", {
      method: "POST",
      body: { codeRequest },
    }),

  restablecerContrasena: (newPassword, confirmNewPassword) =>
    solicitudApi("/recoveryPassword/newPassword", {
      method: "POST",
      body: { newPassword, confirmNewPassword },
    }),

  cerrarSesion: () => solicitudApi("/logout", { method: "POST" }),
};

export default servicioAutenticacion;

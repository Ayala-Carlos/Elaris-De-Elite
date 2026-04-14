import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Login con:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0eb] px-4 py-10">
      <div className="bg-white rounded-2xl border border-[#e8e0d8] p-10 w-full max-w-md shadow-sm">

        {/* Logo / Brand */}
        <h1
          className="text-center text-[#c0392b] text-3xl tracking-widest mb-6 font-bold"
          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
        >
          ÉLARIS DE ÉLITE
        </h1>

        {/* Título */}
        <h2
          className="text-center text-[#3b2a2a] text-xl font-bold mb-1"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Iniciar sesión
        </h2>
        <p
          className="text-center text-[#7a6a6a] text-sm mb-7"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Ingresa tus credenciales para continuar
        </p>

        {/* Campo: Correo electrónico */}
        <div className="mb-4">
          <label
            className="block text-[#3b2a2a] text-sm font-semibold mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Correo electrónico
          </label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>

        {/* Campo: Contraseña */}
        <div className="mb-6">
          <label
            className="block text-[#3b2a2a] text-sm font-semibold mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>

        {/* Botón */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#c0392b] hover:bg-[#a93224] text-white font-bold text-sm py-3 rounded-full transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Iniciar sesión
        </button>

        {/* Link a Register */}
        <p
          className="text-center text-sm text-[#7a6a6a] mt-5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-[#c0392b] font-semibold hover:underline">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
}
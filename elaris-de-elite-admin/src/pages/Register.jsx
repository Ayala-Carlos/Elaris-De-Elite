import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Datos del formulario:", form);
    // Aquí va tu lógica de registro (fetch/axios al backend)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0eb] px-4 py-10">
      <div className="bg-white rounded-2xl border border-[#e8e0d8] p-10 w-full max-w-lg shadow-sm">

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
          Crear cuenta
        </h2>
        <p
          className="text-center text-[#7a6a6a] text-sm mb-7"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Ingresa los datos para crear su cuenta
        </p>

        {/* Campo: Nombre completo */}
        <div className="mb-4">
          <label
            className="block text-[#3b2a2a] text-sm font-semibold mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Nombre completo
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>

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

        {/* Fila: Contraseña + Teléfono */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
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
          <div>
            <label
              className="block text-[#3b2a2a] text-sm font-semibold mb-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Numero de teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>
        </div>

        {/* Campo: Dirección */}
        <div className="mb-6">
          <label
            className="block text-[#3b2a2a] text-sm font-semibold mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
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
          <Link to="/dashboard">
            Crear cuenta
          </Link>
        </button>

        {/* Link a Login */}
        <p
          className="text-center text-sm text-[#7a6a6a] mt-5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-[#c0392b] font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
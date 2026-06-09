import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: isFormData ? options.headers : { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    body: options.body && !isFormData ? JSON.stringify(options.body) : options.body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en la solicitud");
  return data;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    direccion: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.correo || !form.contrasena) {
      setError("Nombre, correo y contraseña son obligatorios.");
      return;
    }
    setLoading(true);
    try {
      await apiRequest("/registerAdmin", {
        method: "POST",
        body: {
          name: form.nombre,
          email: form.correo,
          password: form.contrasena,
          phoneNumber: form.telefono,
          address: form.direccion,
        },
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0eb] px-4 py-10">
      <div className="bg-white rounded-2xl border border-[#e8e0d8] p-10 w-full max-w-lg shadow-sm">

        <h1
          className="text-center text-[#c0392b] text-3xl tracking-widest mb-6 font-bold"
          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
        >
          ÉLARIS DE ÉLITE
        </h1>

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

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Nombre completo
          </label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }} />
        </div>

        <div className="mb-4">
          <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Correo electrónico
          </label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Contraseña
            </label>
            <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange}
              className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }} />
          </div>
          <div>
            <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Número de teléfono
            </label>
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange}
              className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }} />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Dirección
          </label>
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#c0392b] hover:bg-[#a93224] disabled:bg-[#e8a090] text-white font-bold text-sm py-3 rounded-full transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p
          className="text-center text-sm text-[#7a6a6a] mt-5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-[#c0392b] font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

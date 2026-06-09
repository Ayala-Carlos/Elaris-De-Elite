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

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.correo || !form.contrasena) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await apiRequest("/loginAdmin", {
        method: "POST",
        body: { email: form.correo, password: form.contrasena },
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0eb] px-4 py-10">
      <div className="bg-white rounded-2xl border border-[#e8e0d8] p-10 w-full max-w-md shadow-sm">

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
          Iniciar sesión
        </h2>
        <p
          className="text-center text-[#7a6a6a] text-sm mb-7"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Ingresa tus credenciales para continuar
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
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

        <div className="mb-6">
          <label className="block text-[#3b2a2a] text-sm font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Contraseña
          </label>
          <input
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full rounded-full bg-[#fdf6f2] border border-[#e8ddd5] px-4 py-2.5 text-sm text-[#3b2a2a] outline-none focus:border-[#c0392b] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#c0392b] hover:bg-[#a93224] disabled:bg-[#e8a090] text-white font-bold text-sm py-3 rounded-full transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <p
          className="text-center text-sm text-[#7a6a6a] mt-5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-[#c0392b] font-semibold hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    body: options.body ? JSON.stringify(options.body) : options.body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en la solicitud");
  return data;
}

const initialForm = { nombre: "", correo: "", contrasena: "", telefono: "", direccion: "" };

export default function AgregarAdministrador() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim() || form.nombre.trim().length < 3) newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) newErrors.correo = "Ingresa un correo válido";
    if (form.contrasena.length < 6) newErrors.contrasena = "Debe tener al menos 6 caracteres";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/registerAdmin", {
        method: "POST",
        body: {
          name: form.nombre.trim(),
          email: form.correo.trim(),
          password: form.contrasena,
          phoneNumber: form.telefono.trim(),
          address: form.direccion.trim(),
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Administrador creado",
        text: "La cuenta fue registrada correctamente",
        confirmButtonColor: "#c8a87a",
      });

      navigate("/administradores");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message || "No se pudo crear el administrador" });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${
      errors[name] ? "border-red-300 bg-red-50" : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
    }`;

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <button
              onClick={() => navigate("/administradores")}
              className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Agregar administrador</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Crea una nueva cuenta con acceso al panel de administración</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8 max-w-lg">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#5a4a4a]">Nombre completo <span className="text-red-400">*</span></label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: María Pérez" className={fieldClass("nombre")} />
                {errors.nombre && <span className="text-xs text-red-400">{errors.nombre}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#5a4a4a]">Correo electrónico <span className="text-red-400">*</span></label>
                <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="admin@elarisdeelite.com" className={fieldClass("correo")} />
                {errors.correo && <span className="text-xs text-red-400">{errors.correo}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Contraseña <span className="text-red-400">*</span></label>
                  <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} className={fieldClass("contrasena")} />
                  {errors.contrasena && <span className="text-xs text-red-400">{errors.contrasena}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Teléfono</label>
                  <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} className={fieldClass("telefono")} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#5a4a4a]">Dirección</label>
                <input type="text" name="direccion" value={form.direccion} onChange={handleChange} className={fieldClass("direccion")} />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#c8a87a] hover:bg-[#b8986a] disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-sm mt-2"
              >
                {loading ? "Creando..." : "Crear administrador"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

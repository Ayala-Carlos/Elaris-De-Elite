import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";

const initialForm = {
  nombre: "",
  plataforma: "",
  presupuesto: "",
  fechaInicio: "",
  fechaFinal: "",
  descripcion: "",
};

export default function AgregarCampana() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.plataforma.trim()) newErrors.plataforma = "La plataforma es requerida";
    if (!form.presupuesto.trim()) newErrors.presupuesto = "El presupuesto es requerido";
    if (!form.fechaInicio) newErrors.fechaInicio = "La fecha de inicio es requerida";
    if (!form.fechaFinal) newErrors.fechaFinal = "La fecha final es requerida";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate("/marketing"), 1500);
  };

  return (
    <div
      className="min-h-screen bg-[#f5f0eb]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          {/* Header con botón atrás */}
          <div>
            <button
              onClick={() => navigate("/marketing")}
              className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Agregar campaña de marketing</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Complete los datos para agregar una campaña</p>
          </div>

          {/* Card del formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex gap-8">
              {/* Columna izquierda — campos del formulario */}
              <div className="flex-1 flex flex-col gap-5">

                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Nombre de la campaña <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Campaña primavera 2025"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                      ${errors.nombre
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                      }`}
                  />
                  {errors.nombre && <span className="text-xs text-red-400">{errors.nombre}</span>}
                </div>

                {/* Plataforma */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Plataforma <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="plataforma"
                    value={form.plataforma}
                    onChange={handleChange}
                    placeholder="Ej: Instagram, Facebook, TikTok..."
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                      ${errors.plataforma
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                      }`}
                  />
                  {errors.plataforma && <span className="text-xs text-red-400">{errors.plataforma}</span>}
                </div>

                {/* Fila: Presupuesto */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Presupuesto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="presupuesto"
                    value={form.presupuesto}
                    onChange={handleChange}
                    placeholder="Ej: $500.00"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                      ${errors.presupuesto
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                      }`}
                  />
                  {errors.presupuesto && <span className="text-xs text-red-400">{errors.presupuesto}</span>}
                </div>

                {/* Fila: Fechas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Fecha de inicio <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={form.fechaInicio}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all
                        ${errors.fechaInicio
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.fechaInicio && <span className="text-xs text-red-400">{errors.fechaInicio}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Fecha final <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="fechaFinal"
                      value={form.fechaFinal}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all
                        ${errors.fechaFinal
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.fechaFinal && <span className="text-xs text-red-400">{errors.fechaFinal}</span>}
                  </div>
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe el objetivo o enfoque de la campaña..."
                    rows={4}
                    className="w-full border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white resize-none placeholder:text-[#bbb]"
                  />
                </div>
              </div>

              {/* Columna derecha — acciones */}
            <div className="w-72 flex flex-col justify-end gap-4">
            <button
                onClick={handleSubmit}
                disabled={loading || success}
                className={`w-full font-bold py-3 rounded-xl text-sm transition-all shadow-sm
                ${success
                    ? "bg-green-400 text-white cursor-default"
                    : loading
                    ? "bg-[#e8c898] text-white cursor-wait"
                    : "bg-[#e8a0a0] hover:bg-[#d89090] active:bg-[#c88080] text-white"
                }`}
            >
                {success ? (
                <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    ¡Campaña agregada!
                </span>
                ) : loading ? (
                "Guardando..."
                ) : (
                "Agregar campaña"
                )}
            </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
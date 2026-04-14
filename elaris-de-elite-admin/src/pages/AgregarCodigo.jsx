import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";

const initialForm = {
  codigo: "",
  porcentaje: "",
  fechaExpiracion: "",
  limiteUso: "",
  estado: "activo",
};

export default function AgregarDescuento() {
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
    if (!form.codigo.trim()) newErrors.codigo = "El código es requerido";
    if (!form.porcentaje.trim()) newErrors.porcentaje = "El porcentaje es requerido";
    if (!form.fechaExpiracion) newErrors.fechaExpiracion = "La fecha de expiración es requerida";
    if (!form.limiteUso.trim()) newErrors.limiteUso = "El límite de uso es requerido";
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
    setTimeout(() => navigate("/descuentos"), 1500);
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
          {/* Header */}
          <div>
            <button
              onClick={() => navigate("/descuentos")}
              className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Agregar código de descuento</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Complete los datos para agregar un código de descuento</p>
          </div>

          {/* Card del formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex gap-8">
              {/* Columna izquierda */}
              <div className="flex-1 flex flex-col gap-5">

                {/* Código */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Código <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={form.codigo}
                    onChange={(e) => {
                      handleChange({ target: { name: "codigo", value: e.target.value.toUpperCase() } });
                    }}
                    placeholder="Ej: VERANO2026"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] tracking-widest font-semibold
                      ${errors.codigo
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                      }`}
                  />
                  {errors.codigo && <span className="text-xs text-red-400">{errors.codigo}</span>}
                </div>

                {/* Fila: Porcentaje + Límite de uso */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Porcentaje de descuento <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="porcentaje"
                        value={form.porcentaje}
                        onChange={handleChange}
                        placeholder="Ej: 10"
                        min="1"
                        max="100"
                        className={`w-full border rounded-xl px-4 py-2.5 pr-8 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                          ${errors.porcentaje
                            ? "border-red-300 bg-red-50 focus:border-red-400"
                            : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                          }`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#a09090] font-semibold pointer-events-none">%</span>
                    </div>
                    {errors.porcentaje && <span className="text-xs text-red-400">{errors.porcentaje}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Límite de uso <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="limiteUso"
                      value={form.limiteUso}
                      onChange={handleChange}
                      placeholder="Ej: 100"
                      min="1"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                        ${errors.limiteUso
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.limiteUso && <span className="text-xs text-red-400">{errors.limiteUso}</span>}
                  </div>
                </div>

                {/* Fecha de expiración */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Fecha de expiración <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="fechaExpiracion"
                    value={form.fechaExpiracion}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all
                      ${errors.fechaExpiracion
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                      }`}
                  />
                  {errors.fechaExpiracion && <span className="text-xs text-red-400">{errors.fechaExpiracion}</span>}
                </div>

                {/* Estado */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Estado</label>
                  <div className="flex gap-3">
                    {[
                      { value: "activo", label: "Activo" },
                      { value: "inactivo", label: "Inactivo" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setForm((prev) => ({ ...prev, estado: opt.value }))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all
                          ${form.estado === opt.value
                            ? opt.value === "activo"
                              ? "bg-green-50 border-green-300 text-green-700"
                              : "bg-red-50 border-red-300 text-red-400"
                            : "bg-[#faf8f6] border-[#e0d8d0] text-[#7a6a6a] hover:border-[#c8a87a]"
                          }`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          form.estado === opt.value
                            ? opt.value === "activo" ? "bg-green-500" : "bg-red-400"
                            : "bg-[#ccc]"
                        }`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna derecha — submit */}
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
                      ¡Código agregado!
                    </span>
                  ) : loading ? (
                    "Guardando..."
                  ) : (
                    "Agregar código"
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
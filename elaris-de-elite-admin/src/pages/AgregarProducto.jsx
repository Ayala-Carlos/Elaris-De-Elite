import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";

const initialForm = {
  nombre: "",
  categoria: "",
  precio: "",
  marca: "",
  cantidad: "",
  descripcion: "",
  caracteristicas: "",
  imagen: null,
};

export default function AgregarProducto() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [caracteristicasList, setCaracteristicasList] = useState([]);
  const [inputCaracteristica, setInputCaracteristica] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imagen: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleAddCaracteristica = () => {
    const trimmed = inputCaracteristica.trim();
    if (trimmed && !caracteristicasList.includes(trimmed)) {
      setCaracteristicasList((prev) => [...prev, trimmed]);
      setInputCaracteristica("");
    }
  };

  const handleRemoveCaracteristica = (index) => {
    setCaracteristicasList((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.categoria.trim()) newErrors.categoria = "La categoría es requerida";
    if (!form.precio.trim()) newErrors.precio = "El precio es requerido";
    if (!form.marca.trim()) newErrors.marca = "La marca es requerida";
    if (!form.cantidad.trim()) newErrors.cantidad = "La cantidad es requerida";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Simulación de envío — reemplazar con llamada real a la API
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate("/productos"), 1500);
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
              onClick={() => navigate("/productos")}
              className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Agregar producto</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Complete los datos para agregar un producto</p>
          </div>

          {/* Card del formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex gap-8">
              {/* Columna izquierda — campos del formulario */}
              <div className="flex-1 flex flex-col gap-5">
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Nombre del producto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Base premium pink fly"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                      ${errors.nombre
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                      }`}
                  />
                  {errors.nombre && <span className="text-xs text-red-400">{errors.nombre}</span>}
                </div>

                {/* Fila: Categoría + Precio */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Categoría del producto <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="categoria"
                      value={form.categoria}
                      onChange={handleChange}
                      placeholder="Ej: Rostro"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                        ${errors.categoria
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.categoria && <span className="text-xs text-red-400">{errors.categoria}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Precio del producto <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="precio"
                      value={form.precio}
                      onChange={handleChange}
                      placeholder="Ej: $75.00"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                        ${errors.precio
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.precio && <span className="text-xs text-red-400">{errors.precio}</span>}
                  </div>
                </div>

                {/* Fila: Marca + Cantidad */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Marca <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="marca"
                      value={form.marca}
                      onChange={handleChange}
                      placeholder="Ej: L'Oréal"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                        ${errors.marca
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.marca && <span className="text-xs text-red-400">{errors.marca}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      Cantidad <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      value={form.cantidad}
                      onChange={handleChange}
                      placeholder="Ej: 50"
                      min="0"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
                        ${errors.cantidad
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                    />
                    {errors.cantidad && <span className="text-xs text-red-400">{errors.cantidad}</span>}
                  </div>
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe las características generales del producto..."
                    rows={4}
                    className="w-full border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white resize-none placeholder:text-[#bbb]"
                  />
                </div>

                {/* Características principales */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Características principales</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCaracteristica}
                      onChange={(e) => setInputCaracteristica(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddCaracteristica()}
                      placeholder="Ej: SPF 30, resistente al agua..."
                      className="flex-1 border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white placeholder:text-[#bbb]"
                    />
                    <button
                      onClick={handleAddCaracteristica}
                      className="w-10 h-10 rounded-full bg-[#f0e8df] hover:bg-[#e8ddd4] text-[#c8a87a] flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"/><path d="M5 12h14"/>
                      </svg>
                    </button>
                  </div>
                  {/* Tags de características */}
                  {caracteristicasList.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {caracteristicasList.map((car, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1.5 bg-[#f0e8df] text-[#7a5a3a] text-xs font-semibold px-3 py-1.5 rounded-full"
                        >
                          {car}
                          <button
                            onClick={() => handleRemoveCaracteristica(index)}
                            className="text-[#c8a87a] hover:text-[#a07050] transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna derecha — imagen + botón submit */}
              <div className="w-72 flex flex-col gap-4">
                {/* Preview de imagen */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square rounded-2xl border-2 border-dashed border-[#e0d8d0] bg-[#faf8f6] flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#c8a87a] hover:bg-[#fdf9f6] transition-all group"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-[#c0b0a0]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#c8a87a] transition-colors">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                      <span className="text-xs text-center font-medium px-4 group-hover:text-[#c8a87a] transition-colors">
                        Haz clic para subir una imagen
                      </span>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#c8a87a] hover:bg-[#b8986a] active:bg-[#a8886a] text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Subir imagen
                </button>

                {/* Botón Agregar producto */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || success}
                  className={`w-full font-bold py-3 rounded-xl text-sm transition-all shadow-sm mt-auto
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
                      ¡Producto agregado!
                    </span>
                  ) : loading ? (
                    "Guardando..."
                  ) : (
                    "Agregar producto"
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
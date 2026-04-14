import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";

// ── Subcomponente reutilizable: campo de formulario ──────────────────────────
function FormField({ label, name, value, onChange, placeholder, error, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#5a4a4a]">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb]
          ${error
            ? "border-red-300 bg-red-50 focus:border-red-400"
            : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
          }`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

// ── Subcomponente: selector de estado ────────────────────────────────────────
function StatusSelect({ name, value, onChange, label }) {
  return (
    <div className="flex flex-col gap-1.5 w-40">
      <label className="text-sm font-semibold text-[#5a4a4a]">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white cursor-pointer"
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
    </div>
  );
}

// ── Subcomponente: botón de acción principal ─────────────────────────────────
function ActionButton({ onClick, loading, success, label, successLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || success}
      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm
        ${success
          ? "bg-green-400 text-white cursor-default"
          : loading
            ? "bg-[#e8c898] text-white cursor-wait"
            : "bg-[#e8a0a0] hover:bg-[#d89090] active:bg-[#c88080] text-white"
        }`}
    >
      {success ? (
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          {successLabel}
        </span>
      ) : loading ? "Guardando..." : label}
    </button>
  );
}

// ── Estado inicial de los formularios ────────────────────────────────────────
const initialMarca = { nombre: "", pais: "", estado: "Activo" };
const initialCategoria = { nombre: "", descripcion: "", estado: "Activo" };

// ── Página principal ─────────────────────────────────────────────────────────
export default function CategoriasYMarcas() {
  const navigate = useNavigate();

  // Formulario Marca
  const [marca, setMarca] = useState(initialMarca);
  const [erroresMarca, setErroresMarca] = useState({});
  const [loadingMarca, setLoadingMarca] = useState(false);
  const [successMarca, setSuccessMarca] = useState(false);

  // Formulario Categoría
  const [categoria, setCategoria] = useState(initialCategoria);
  const [erroresCategoria, setErroresCategoria] = useState({});
  const [loadingCategoria, setLoadingCategoria] = useState(false);
  const [successCategoria, setSuccessCategoria] = useState(false);

  // Handlers Marca
  const handleMarcaChange = (e) => {
    const { name, value } = e.target;
    setMarca((prev) => ({ ...prev, [name]: value }));
    if (erroresMarca[name]) setErroresMarca((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMarcaSubmit = async () => {
    const errors = {};
    if (!marca.nombre.trim()) errors.nombre = "El nombre es requerido";
    if (!marca.pais.trim()) errors.pais = "El país es requerido";
    if (Object.keys(errors).length > 0) { setErroresMarca(errors); return; }

    setLoadingMarca(true);
    await new Promise((res) => setTimeout(res, 1000)); // Reemplazar con llamada a API
    setLoadingMarca(false);
    setSuccessMarca(true);
    setTimeout(() => {
      setMarca(initialMarca);
      setSuccessMarca(false);
    }, 2000);
  };

  // Handlers Categoría
  const handleCategoriaChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
    if (erroresCategoria[name]) setErroresCategoria((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategoriaSubmit = async () => {
    const errors = {};
    if (!categoria.nombre.trim()) errors.nombre = "El nombre es requerido";
    if (Object.keys(errors).length > 0) { setErroresCategoria(errors); return; }

    setLoadingCategoria(true);
    await new Promise((res) => setTimeout(res, 1000)); // Reemplazar con llamada a API
    setLoadingCategoria(false);
    setSuccessCategoria(true);
    setTimeout(() => {
      setCategoria(initialCategoria);
      setSuccessCategoria(false);
    }, 2000);
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
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Agregar marca y categorías</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Complete los datos para agregar una marca o categoría</p>
          </div>

          {/* Card formulario Marca */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            {/* Divisor con título de sección */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[#c8a87a] rounded-full" />
              <h2 className="text-base font-bold text-[#3b2a2a]">Nueva marca</h2>
            </div>

            <div className="flex flex-col gap-5">
              {/* Nombre de la marca */}
              <FormField
                label="Nombre de la marca"
                name="nombre"
                value={marca.nombre}
                onChange={handleMarcaChange}
                placeholder="Ej: L'Oréal Paris"
                error={erroresMarca.nombre}
                required
              />

              {/* País */}
              <FormField
                label="País de origen"
                name="pais"
                value={marca.pais}
                onChange={handleMarcaChange}
                placeholder="Ej: Francia"
                error={erroresMarca.pais}
                required
              />

              {/* Fila: Estado + Botón */}
              <div className="flex items-end gap-4">
                <StatusSelect
                  name="estado"
                  value={marca.estado}
                  onChange={handleMarcaChange}
                  label="Estado"
                />
                <ActionButton
                  onClick={handleMarcaSubmit}
                  loading={loadingMarca}
                  success={successMarca}
                  label="Agregar marca"
                  successLabel="¡Marca agregada!"
                />
              </div>
            </div>
          </div>

          {/* Card formulario Categoría */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[#c8a87a] rounded-full" />
              <h2 className="text-base font-bold text-[#3b2a2a]">Nueva categoría</h2>
            </div>

            <div className="flex flex-col gap-5">
              {/* Nombre de la categoría */}
              <FormField
                label="Nombre de la categoría"
                name="nombre"
                value={categoria.nombre}
                onChange={handleCategoriaChange}
                placeholder="Ej: Rostro, Fragancias, Labios..."
                error={erroresCategoria.nombre}
                required
              />

              {/* Descripción */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#5a4a4a]">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={categoria.descripcion}
                  onChange={handleCategoriaChange}
                  placeholder="Breve descripción de la categoría..."
                  className="w-full border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white placeholder:text-[#bbb]"
                />
              </div>

              {/* Fila: Estado + Botón */}
              <div className="flex items-end gap-4">
                <StatusSelect
                  name="estado"
                  value={categoria.estado}
                  onChange={handleCategoriaChange}
                  label="Estado"
                />
                <ActionButton
                  onClick={handleCategoriaSubmit}
                  loading={loadingCategoria}
                  success={successCategoria}
                  label="Agregar categoría"
                  successLabel="¡Categoría agregada!"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
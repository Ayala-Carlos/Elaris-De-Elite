import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: options.body instanceof FormData ? options.headers : { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en la solicitud");
  return data;
}

function FormField({ label, name, value, onChange, placeholder, error, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#5a4a4a]">{label} {required && <span className="text-red-400">*</span>}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${error ? "border-red-300 bg-red-50" : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"}`} />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

function ActionButton({ onClick, loading, success, label, successLabel }) {
  return (
    <button onClick={onClick} disabled={loading || success}
      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${success ? "bg-green-400 text-white cursor-default" : loading ? "bg-[#e8c898] text-white cursor-wait" : "bg-[#e8a0a0] hover:bg-[#d89090] text-white"}`}>
      {success ? successLabel : loading ? "Guardando..." : label}
    </button>
  );
}

const initialMarca = { nombre: "", pais: "" };
const initialCategoria = { nombre: "", descripcion: "" };

export default function CategoriasYMarcas() {
  const navigate = useNavigate();

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marca, setMarca] = useState(initialMarca);
  const [categoria, setCategoria] = useState(initialCategoria);
  const [erroresMarca, setErroresMarca] = useState({});
  const [erroresCategoria, setErroresCategoria] = useState({});
  const [loadingMarca, setLoadingMarca] = useState(false);
  const [successMarca, setSuccessMarca] = useState(false);
  const [loadingCategoria, setLoadingCategoria] = useState(false);
  const [successCategoria, setSuccessCategoria] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest("/brands"), apiRequest("/categories")])
      .then(([m, c]) => {
        setMarcas(Array.isArray(m) ? m : []);
        setCategorias(Array.isArray(c) ? c : []);
      })
      .catch(() => setApiError("Error al cargar marcas y categorías."));
  }, []);

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
    try {
      const payload = new FormData();
      payload.append("name", marca.nombre);
      payload.append("country", marca.pais);
      payload.append("status", "active");
      await apiRequest("/brands", { method: "POST", body: payload });
      setMarcas(await apiRequest("/brands"));
      setSuccessMarca(true);
      setTimeout(() => { setMarca(initialMarca); setSuccessMarca(false); }, 2000);
    } catch (err) {
      setApiError("Error al crear la marca: " + err.message);
    } finally {
      setLoadingMarca(false);
    }
  };

  const handleCategoriaChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
    if (erroresCategoria[name]) setErroresCategoria((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategoriaSubmit = async () => {
    const errors = {};
    if (!categoria.nombre.trim()) errors.nombre = "El nombre es requerido";
    if (!categoria.descripcion.trim()) errors.descripcion = "La descripción es requerida";
    if (Object.keys(errors).length > 0) { setErroresCategoria(errors); return; }
    setLoadingCategoria(true);
    try {
      await apiRequest("/categories", {
        method: "POST",
        body: { name: categoria.nombre, description: categoria.descripcion },
      });
      setCategorias(await apiRequest("/categories"));
      setSuccessCategoria(true);
      setTimeout(() => { setCategoria(initialCategoria); setSuccessCategoria(false); }, 2000);
    } catch (err) {
      setApiError("Error al crear la categoría: " + err.message);
    } finally {
      setLoadingCategoria(false);
    }
  };

  const handleEliminarMarca = async (id) => {
    if (!window.confirm("¿Eliminar esta marca?")) return;
    try {
      await apiRequest(`/brands/${id}`, { method: "DELETE" });
      setMarcas((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  const handleEliminarCategoria = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría?")) return;
    try {
      await apiRequest(`/categories/${id}`, { method: "DELETE" });
      setCategorias((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <button onClick={() => navigate("/productos")} className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Categorías y marcas</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione las categorías y marcas de sus productos</p>
          </div>

          {apiError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{apiError}</div>}

          {/* Formulario Marca */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-1 h-6 bg-[#c8a87a] rounded-full" /><h2 className="text-base font-bold text-[#3b2a2a]">Nueva marca</h2></div>
            <div className="flex flex-col gap-5">
              <FormField label="Nombre de la marca" name="nombre" value={marca.nombre} onChange={handleMarcaChange} placeholder="Ej: L'Oréal Paris" error={erroresMarca.nombre} required />
              <FormField label="País de origen" name="pais" value={marca.pais} onChange={handleMarcaChange} placeholder="Ej: Francia" error={erroresMarca.pais} required />
              <div className="flex items-end gap-4">
                <ActionButton onClick={handleMarcaSubmit} loading={loadingMarca} success={successMarca} label="Agregar marca" successLabel="¡Marca agregada!" />
              </div>
              {/* Lista de marcas existentes */}
              {marcas.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-bold text-[#9a8a8a] uppercase tracking-wider mb-2">Marcas existentes</p>
                  <div className="flex flex-wrap gap-2">
                    {marcas.map((m) => (
                      <span key={m._id} className="flex items-center gap-1.5 bg-[#f0e8df] text-[#7a5a3a] text-xs font-semibold px-3 py-1.5 rounded-full">
                        {m.name || m.nombre}
                        <button onClick={() => handleEliminarMarca(m._id)} className="text-red-400 hover:text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Formulario Categoría */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-1 h-6 bg-[#c8a87a] rounded-full" /><h2 className="text-base font-bold text-[#3b2a2a]">Nueva categoría</h2></div>
            <div className="flex flex-col gap-5">
              <FormField label="Nombre de la categoría" name="nombre" value={categoria.nombre} onChange={handleCategoriaChange} placeholder="Ej: Rostro, Fragancias, Labios..." error={erroresCategoria.nombre} required />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#5a4a4a]">Descripción <span className="text-red-400">*</span></label>
                <input type="text" name="descripcion" value={categoria.descripcion} onChange={handleCategoriaChange} placeholder="Breve descripción de la categoría..."
                  className="w-full border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white placeholder:text-[#bbb]" />
                {erroresCategoria.descripcion && <span className="text-xs text-red-400">{erroresCategoria.descripcion}</span>}
              </div>
              <div className="flex items-end gap-4">
                <ActionButton onClick={handleCategoriaSubmit} loading={loadingCategoria} success={successCategoria} label="Agregar categoría" successLabel="¡Categoría agregada!" />
              </div>
              {categorias.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-bold text-[#9a8a8a] uppercase tracking-wider mb-2">Categorías existentes</p>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map((c) => (
                      <span key={c._id} className="flex items-center gap-1.5 bg-[#f0e8df] text-[#7a5a3a] text-xs font-semibold px-3 py-1.5 rounded-full">
                        {c.name || c.nombre}
                        <button onClick={() => handleEliminarCategoria(c._id)} className="text-red-400 hover:text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

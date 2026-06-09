import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import DataTable from "../components/TablaDatos.jsx";
import SearchFilterBar from "../components/BarraBusqueda.jsx";

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

export default function CodigosDescuento() {
  const navigate = useNavigate();
  const [codigosList, setCodigosList] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/discountCodes")
      .then((data) => setCodigosList(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar los códigos."))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este código?")) return;
    try {
      await apiRequest(`/discountCodes/${id}`, { method: "DELETE" });
      setCodigosList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  const codigosFiltrados = codigosList.filter((item) => {
    const codigo = item.code || item.codigo || "";
    const activo = item.isAvailable !== false && item.estado !== "Expirado";
    const coincideTexto = codigo.toLowerCase().includes(textoBusqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" ||
      (filtroEstado === "Activos" && activo) ||
      (filtroEstado === "Expirados" && !activo);
    return coincideTexto && coincideEstado;
  });

  const activos = codigosList.filter((c) => c.isAvailable !== false).length;
  const expirados = codigosList.length - activos;

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#65554f]">Códigos de descuento</h1>
              <p className="text-sm text-[#8a7a7a] mt-0.5">Gestione sus códigos de descuento</p>
            </div>
            <button onClick={() => navigate("/descuentos/agregar")} className="bg-[#d2ab7e] hover:bg-[#c29b6e] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-sm">
              Agregar código
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total de códigos", value: String(codigosList.length) },
              { label: "Códigos activos", value: String(activos) },
              { label: "Códigos expirados", value: String(expirados) },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#9a8a8a] font-medium mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-[#d2ab7e]">{stat.value}</p>
              </div>
            ))}
          </div>

          <SearchFilterBar
            placeholder="Ingrese el nombre del código"
            filters={["Todos", "Activos", "Expirados"]}
            activeFilter={filtroEstado}
            onFilterClick={(f) => setFiltroEstado(f)}
            onSearchChange={(val) => setTextoBusqueda(val)}
          />

          {loading ? (
            <p className="text-center text-[#9a8a8a] py-10">Cargando códigos...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : (
            <DataTable
              headers={["Código", "Porcentaje de descuento", "Fecha de expiración", "Estado", "Límite de uso", "Acciones"]}
              gridCols="grid-cols-[1.5fr_2fr_1.5fr_1fr_1fr_1fr]"
              data={codigosFiltrados}
              renderRow={(item) => {
                const codigo = item.code || item.codigo || "—";
                const porcentaje = item.discountPercentage || item.porcentaje || "—";
                const fecha = item.expirationDate
                  ? new Date(item.expirationDate).toLocaleDateString("es-SV")
                  : item.fechaExpiracion || "—";
                const activo = item.isAvailable !== false;
                const limiteUso = item.usageLimit || item.limiteUso || "—";

                return (
                  <>
                    <div className="font-bold text-[#65554f] text-sm pl-2 uppercase">{codigo}</div>
                    <div className="text-[#65554f] font-medium text-sm text-center">{porcentaje}%</div>
                    <div className="text-[#65554f] font-medium text-sm text-center">{fecha}</div>
                    <div className="flex justify-center">
                      <span className={`px-4 py-1 text-xs font-semibold rounded-full text-white ${activo ? "bg-[#a3ceac]" : "bg-[#ef4444]"}`}>
                        {activo ? "Activo" : "Expirado"}
                      </span>
                    </div>
                    <div className="text-[#65554f] font-medium text-sm text-center">{limiteUso}</div>
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleEliminar(item._id)} className="text-[#ef4444] hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </>
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

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

export default function CampanasMarketing() {
  const navigate = useNavigate();
  const [campanasList, setCampanasList] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/marketingCampaings")
      .then((data) => setCampanasList(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar las campañas."))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta campaña?")) return;
    try {
      await apiRequest(`/marketingCampaings/${id}`, { method: "DELETE" });
      setCampanasList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  const campanasFiltradas = campanasList.filter((campana) => {
    const nombre = campana.name || campana.nombre || "";
    const estado = campana.isActive !== false ? "Activa" : "Inactiva";
    const coincideTexto = nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    const coincideEstado = filtroEstado === "Todos" || estado === filtroEstado ||
      (filtroEstado === "Activas" && estado === "Activa") ||
      (filtroEstado === "Inactivas" && estado === "Inactiva");
    return coincideTexto && coincideEstado;
  });

  const activas = campanasList.filter((c) => c.isActive !== false).length;
  const inactivas = campanasList.length - activas;

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#3b2a2a]">Campañas de marketing</h1>
              <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus campañas de marketing</p>
            </div>
            <button onClick={() => navigate("/marketing/agregar")} className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-sm">
              Agregar campaña
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total de campañas", value: String(campanasList.length) },
              { label: "Campañas activas", value: String(activas) },
              { label: "Campañas inactivas", value: String(inactivas) },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#9a8a8a] font-medium mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-[#c8a87a]">{stat.value}</p>
              </div>
            ))}
          </div>

          <SearchFilterBar
            placeholder="Ingrese el nombre de la campaña"
            filters={["Todos", "Activas", "Inactivas"]}
            activeFilter={filtroEstado}
            onFilterClick={(f) => setFiltroEstado(f)}
            onSearchChange={(val) => setTextoBusqueda(val)}
          />

          {loading ? (
            <p className="text-center text-[#9a8a8a] py-10">Cargando campañas...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : (
            <DataTable
              headers={["Nombre de la campaña", "Plataforma", "Presupuesto", "Fecha de inicio", "Fecha final", "Acciones"]}
              gridCols="grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr]"
              data={campanasFiltradas}
              renderRow={(campana) => {
                const nombre = campana.name || campana.nombre || "—";
                const plataforma = campana.platform || campana.plataforma || "—";
                const presupuesto = campana.assignedBudget || campana.presupuesto;
                const monto = presupuesto ? `$${Number(presupuesto).toFixed(2)}` : "—";
                const inicio = campana.startDate ? new Date(campana.startDate).toLocaleDateString("es-SV") : campana.fechaInicio || "—";
                const fin = campana.endDate ? new Date(campana.endDate).toLocaleDateString("es-SV") : campana.fechaFinal || "—";

                return (
                  <>
                    <div className="font-bold text-[#3b2a2a] pl-2">{nombre}</div>
                    <div className="text-[#5a4a4a] font-medium">{plataforma}</div>
                    <div className="text-[#5a4a4a] font-medium">{monto}</div>
                    <div className="text-[#7a6a6a] text-sm">{inicio}</div>
                    <div className="text-[#7a6a6a] text-sm">{fin}</div>
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleEliminar(campana._id)} className="text-[#ef4444] hover:text-red-600 transition-colors">
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

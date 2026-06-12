import { useState, useEffect } from "react";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import DataTable from "../components/TablaDatos.jsx";
import SearchFilterBar from "../components/BarraBusqueda.jsx";
import Swal from "sweetalert2"; // Importamos SweetAlert2

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

function getInitials(nombre) {
  return (nombre || "??").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/customers")
      .then((data) => setClientes(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar los clientes."))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id) => {
    // Alerta de confirmación con SweetAlert2
    Swal.fire({
      title: "¿Eliminar este cliente?",
      text: "Esta acción no se puede deshacer de forma directa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#7a6a6a",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#ffffff"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/customers/${id}`, { method: "DELETE" });
          setClientes((prev) => prev.filter((c) => c._id !== id));
          
          // Alerta de éxito autoprogramada para cerrarse sola
          Swal.fire({
            title: "¡Eliminado!",
            text: "El cliente ha sido removido.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        } catch (err) {
          // Alerta en caso de error en la API
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar al cliente: " + err.message,
            icon: "error"
          });
        }
      }
    });
  };

  const clientesFiltrados = clientes.filter((c) => {
    const nombre = c.name || c.nombre || "";
    const coincideBusqueda = nombre.toLowerCase().includes(busqueda.toLowerCase());
    const activo = c.isActive !== false;
    const coincideFiltro = filtro === "Todos" || (filtro === "Activos" && activo) || (filtro === "Inactivos" && !activo);
    return coincideBusqueda && coincideFiltro;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Clientes</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus clientes</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total clientes", value: String(clientes.length) },
              { label: "Activos", value: String(clientes.filter((c) => c.isActive !== false).length) },
              { label: "Inactivos", value: String(clientes.filter((c) => c.isActive === false).length) },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#ede8e0] p-5 shadow-sm">
                <p className="text-xs text-[#7a6a6a] mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-[#c8a87a]">{stat.value}</p>
              </div>
            ))}
          </div>

          <SearchFilterBar
            placeholder="Ingrese el nombre del cliente"
            filters={["Todos", "Activos", "Inactivos"]}
            activeFilter={filtro}
            onFilterClick={(f) => setFiltro(f)}
            onSearchChange={(val) => setBusqueda(val)}
          />

          {loading ? (
            <p className="text-center text-[#9a8a8a] py-10">Cargando clientes...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {clientesFiltrados.map((c) => {
                const nombre = c.name || c.nombre || "—";
                const email = c.email || "—";
                const ubicacion = c.address || c.ubicacion || "—";
                const telefono = c.phone || c.phoneNumber || c.telefono || "—";
                const activo = c.isActive !== false;
                const desde = c.createdAt ? new Date(c.createdAt).toLocaleDateString("es-SV") : "—";

                return (
                  <div key={c._id} className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#4ec9b0] flex items-center justify-center text-white font-bold text-sm">
                            {getInitials(nombre)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#3b2a2a]">{nombre}</p>
                            <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full ${activo ? "bg-[#4ec9b0] text-white" : "bg-[#e0e0e0] text-[#7a7a7a]"}`}>
                              {activo ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => handleEliminar(c._id)} className="text-red-400 hover:text-red-600 transition-colors p-1" title="Eliminar cliente">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                      <div className="space-y-2">
                        {[email, ubicacion, telefono].map((val, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-[#7a6a6a]">
                            <div className="w-3.5 h-3.5 text-[#c8a87a]">•</div>
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 border-t border-[#ede8e0] bg-[#faf8f6]">
                      <div className="py-3 text-center border-r border-[#ede8e0]">
                        <p className="text-[10px] font-bold text-[#3b2a2a] uppercase tracking-wider">Email</p>
                        <p className="text-xs text-[#7a6a6a] mt-0.5 truncate px-2">{email}</p>
                      </div>
                      <div className="py-3 text-center">
                        <p className="text-[10px] font-bold text-[#3b2a2a] uppercase tracking-wider">Desde</p>
                        <p className="text-xs text-[#7a6a6a] mt-0.5">{desde}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {clientesFiltrados.length === 0 && (
                <div className="col-span-2 text-center py-10 text-[#9a8a8a]">No se encontraron clientes.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
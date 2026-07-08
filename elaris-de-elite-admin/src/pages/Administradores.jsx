import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import SearchFilterBar from "../components/BarraBusqueda.jsx";
import Swal from "sweetalert2";
import { getAdminSession } from "../utils/adminSession.js";

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

export default function Administradores() {
  const navigate = useNavigate();
  const [administradores, setAdministradores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sesionActual = getAdminSession();

  useEffect(() => {
    apiRequest("/administrators")
      .then((data) => setAdministradores(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar los administradores."))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = (id, email) => {
    if (sesionActual?.email && email === sesionActual.email) {
      Swal.fire({
        title: "No puedes eliminarte a ti mismo",
        text: "Pide a otro administrador que lo haga por ti.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "¿Eliminar este administrador?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#7a6a6a",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#ffffff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/administrators/${id}`, { method: "DELETE" });
          setAdministradores((prev) => prev.filter((a) => a._id !== id));
          Swal.fire({
            title: "¡Eliminado!",
            text: "El administrador ha sido removido.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar: " + err.message,
            icon: "error",
          });
        }
      }
    });
  };

  const administradoresFiltrados = administradores.filter((a) => {
    const nombre = a.name || "";
    const email = a.email || "";
    const texto = busqueda.toLowerCase();
    return nombre.toLowerCase().includes(texto) || email.toLowerCase().includes(texto);
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#3b2a2a]">Administradores</h1>
              <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione las cuentas con acceso al panel</p>
            </div>
            <button
              onClick={() => navigate("/administradores/agregar")}
              className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              + Agregar administrador
            </button>
          </div>

          <SearchFilterBar
            placeholder="Buscar por nombre o correo"
            onSearchChange={(val) => setBusqueda(val)}
          />

          {loading ? (
            <p className="text-center text-[#9a8a8a] py-10">Cargando administradores...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {administradoresFiltrados.map((a) => (
                <div key={a._id} className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c8a87a] flex items-center justify-center text-white font-bold text-sm">
                          {getInitials(a.name)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#3b2a2a]">{a.name || "—"}</p>
                          {sesionActual?.email === a.email && (
                            <span className="text-[10px] font-bold px-3 py-0.5 rounded-full bg-[#4ec9b0] text-white">Tú</span>
                          )}
                        </div>
                      </div>
                      <button onClick={() => handleEliminar(a._id, a.email)} className="text-red-400 hover:text-red-600 transition-colors p-1" title="Eliminar administrador">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                    <div className="space-y-2 text-[11px] text-[#7a6a6a]">
                      <p>{a.email || "—"}</p>
                      <p>{a.phoneNumber || "Sin teléfono"}</p>
                    </div>
                  </div>
                </div>
              ))}
              {administradoresFiltrados.length === 0 && (
                <div className="col-span-2 text-center py-10 text-[#9a8a8a]">No se encontraron administradores.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

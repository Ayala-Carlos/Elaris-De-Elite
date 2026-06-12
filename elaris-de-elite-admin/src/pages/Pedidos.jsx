import { useState, useEffect } from "react";
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

const STATUS_CLASSES = {
  Completado: "bg-[#a3d2a5]",
  completed: "bg-[#a3d2a5]",
  Pendiente: "bg-yellow-400",
  pending: "bg-yellow-400",
  "En proceso": "bg-red-300",
  processing: "bg-red-300",
};

export default function Pedidos() {
  const [pedidosList, setPedidosList] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/orders")
      .then((data) => setPedidosList(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar los pedidos."))
      .finally(() => setLoading(false));
  }, []);

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await apiRequest(`/orders/${id}`, {
        method: "PUT",
        body: { orderStatus: nuevoEstado },
      });
      setPedidosList((prev) =>
        prev.map((p) => (p._id === id ? { ...p, orderStatus: nuevoEstado, status: nuevoEstado } : p))
      );
    } catch (err) {
      alert("Error al actualizar estado: " + err.message);
    }
  };

  // Función adaptada exactamente a la estructura de tu Backend
  const extraerDatosPedido = (pedido) => {
    const id = pedido._id || "";
    
    // Ruta corregida basándose en el .populate() del backend
    const cliente = pedido.cartId?.customerId?.name || "—";
    const email = pedido.cartId?.customerId?.email || "";

    // Tu backend usa orderDate, cayendo en createdAt como respaldo
    const fechaRaw = pedido.orderDate || pedido.createdAt;
    const fecha = fechaRaw ? new Date(fechaRaw).toLocaleDateString("es-SV") : "—";

    const total = pedido.cartId?.totalAmount || pedido.total || pedido.totalAmount;
    const monto = total ? `$${Number(total).toFixed(2)}` : "—";

    const estado = pedido.orderStatus || pedido.status || "Pendiente";

    return { id, cliente, email, fecha, monto, estado };
  };

  const pedidosFiltrados = pedidosList.filter((pedido) => {
    const { id, cliente, estado } = extraerDatosPedido(pedido);
    
    const coincideTexto =
      id.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
      cliente.toLowerCase().includes(textoBusqueda.toLowerCase());
      
    const coincideEstado = 
      filtroEstado === "Todos" || 
      estado === filtroEstado ||
      (filtroEstado === "Completado" && estado === "completed") ||
      (filtroEstado === "Pendiente" && estado === "pending") ||
      (filtroEstado === "En proceso" && estado === "processing");
      
    return coincideTexto && coincideEstado;
  });

  // Contadores usando la misma lógica unificada de estados
  const total = pedidosList.length;
  const pendientes = pedidosList.filter((p) => ["Pendiente","pending"].includes(p.orderStatus || p.status)).length;
  const enProceso = pedidosList.filter((p) => ["En proceso","processing"].includes(p.orderStatus || p.status)).length;
  const completados = pedidosList.filter((p) => ["Completado","completed"].includes(p.orderStatus || p.status)).length;

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Pedidos</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus pedidos</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total pedidos", value: total, color: "text-[#c8a87a]" },
              { label: "Pendientes", value: pendientes, color: "text-yellow-500" },
              { label: "En proceso", value: enProceso, color: "text-red-400" },
              { label: "Completados", value: completados, color: "text-green-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#9a8a8a] font-medium">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <SearchFilterBar
            placeholder="Buscar por ID o cliente"
            filters={["Todos", "Pendiente", "En proceso", "Completado"]}
            activeFilter={filtroEstado}
            onFilterClick={(f) => setFiltroEstado(f)}
            onSearchChange={(val) => setTextoBusqueda(val)}
          />

          {loading ? (
            <p className="text-center text-[#9a8a8a] py-10">Cargando pedidos...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : (
            <DataTable
              headers={["ID", "Cliente", "Fecha", "Total", "Estado", "Acciones"]}
              gridCols="grid-cols-[1.2fr_2fr_1.2fr_1.2fr_1.2fr_1fr]"
              data={pedidosFiltrados}
              renderRow={(pedido) => {
                const { id, cliente, email, fecha, monto, estado } = extraerDatosPedido(pedido);
                const idFormateado = `ORD-${(id).slice(-6).toUpperCase()}`;
                const bgClass = STATUS_CLASSES[estado] || "bg-gray-300";

                return (
                  <>
                    <div className="text-[#7a6a6a] font-medium text-xs">{idFormateado}</div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#3b2a2a] leading-tight">{cliente}</span>
                      {email && <span className="text-[10px] text-[#9a8a8a]">{email}</span>}
                    </div>
                    <div className="text-[#7a6a6a] text-sm">{fecha}</div>
                    <div className="text-[#3b2a2a] font-bold">{monto}</div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm ${bgClass}`}>
                        {estado}
                      </span>
                    </div>
                    <div className="flex justify-center gap-2">
                      <select
                        value={estado}
                        onChange={(e) => handleCambiarEstado(pedido._id, e.target.value)}
                        className="text-xs border border-[#e0d8d0] rounded-lg px-2 py-1 text-[#3b2a2a] bg-[#faf8f6] outline-none cursor-pointer"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Completado">Completado</option>
                      </select>
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
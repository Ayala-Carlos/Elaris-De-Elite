import { useState, useEffect } from "react";
import Sidebar from "../components/BarraLateral.jsx";
import StatCard from "../components/TarjetaEstadistica.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

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

const ventasData = [
  { dia: "L", ventas: 120 }, { dia: "M", ventas: 80 }, { dia: "M", ventas: 150 },
  { dia: "J", ventas: 60 },  { dia: "V", ventas: 200 }, { dia: "S", ventas: 90 },
  { dia: "D", ventas: 130 }, { dia: "L", ventas: 40 },  { dia: "M", ventas: 170 },
  { dia: "M", ventas: 110 }, { dia: "J", ventas: 190 }, { dia: "V", ventas: 70 },
  { dia: "S", ventas: 160 }, { dia: "D", ventas: 100 },
];

const STATUS_COLOR = {
  Completado: "text-[#c0a080]",
  "En proceso": "text-[#e8a090]",
  Pendiente: "text-[#c0392b]",
};

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [stats, setStats] = useState([
    { label: "Ventas", value: "—", bg: "bg-[#c8a87a]", icon: "💲" },
    { label: "Productos", value: "—", bg: "bg-[#e8a0a0]", icon: "✦" },
    { label: "Clientes", value: "—", bg: "bg-[#8a8a8a]", icon: "👥" },
    { label: "Pedidos", value: "—", bg: "bg-[#c0392b]", icon: "🛍" },
  ]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [pedidosData, clientesData, productosData] = await Promise.all([
          apiRequest("/orders"),
          apiRequest("/customers"),
          apiRequest("/products"),
        ]);

        const listaPedidos = Array.isArray(pedidosData) ? pedidosData : [];
        const listaClientes = Array.isArray(clientesData) ? clientesData : [];
        const listaProductos = Array.isArray(productosData) ? productosData : [];

        // Calcular ventas totales de pedidos completados
        const totalVentas = listaPedidos
          .filter((p) => p.orderStatus === "Completado" || p.orderStatus === "completed" || p.status === "Completado" || p.status === "completed")
          .reduce((acc, p) => acc + Number(p.total || p.totalAmount || 0), 0);

        setStats([
          { label: "Ventas", value: `$${totalVentas.toFixed(2)}`, bg: "bg-[#c8a87a]", icon: "💲" },
          { label: "Productos", value: String(listaProductos.length), bg: "bg-[#e8a0a0]", icon: "✦" },
          { label: "Clientes", value: String(listaClientes.length), bg: "bg-[#8a8a8a]", icon: "👥" },
          { label: "Pedidos", value: String(listaPedidos.length), bg: "bg-[#c0392b]", icon: "🛍" },
        ]);

        // Mostrar los últimos 3 pedidos en la tabla
        setPedidos(listaPedidos.slice(0, 3));
      } catch (err) {
        console.error("Error cargando datos del dashboard:", err);
      }
    }
    cargarDatos();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Dashboard
            </h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Resumen general de la tienda</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {stats.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} bgVariant={s.bg} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Pedidos recientes */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#3b2a2a] text-sm">Pedidos recientes</h2>
                <span className="text-[#c8a87a] text-xs cursor-pointer hover:underline">ver todos</span>
              </div>
              <div className="flex flex-col gap-3">
                {pedidos.length === 0 ? (
                  <p className="text-xs text-[#9a8a8a] text-center py-4">Sin pedidos recientes</p>
                ) : (
                  pedidos.map((p, i) => {
                    const nombre = p.customerName || p.cliente || "Cliente";
                    const id = p._id ? `ORD-${p._id.slice(-4).toUpperCase()}` : "—";
                    const fecha = p.createdAt ? new Date(p.createdAt).toLocaleDateString("es-SV") : "—";
                    const monto = p.total || p.totalAmount ? `$${(p.total || p.totalAmount).toFixed(2)}` : "—";
                    const estado = p.status || "Pendiente";
                    const color = STATUS_COLOR[estado] || "text-[#7a6a6a]";
                    return (
                      <div key={i}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-semibold text-[#3b2a2a]">{nombre}</p>
                            <p className="text-xs text-[#7a6a6a]">{id} - {fecha}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#3b2a2a]">{monto}</p>
                            <p className={`text-xs font-semibold ${color}`}>{estado}</p>
                          </div>
                        </div>
                        {i < pedidos.length - 1 && <div className="border-t border-[#ede8e0] mt-3" />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Productos más vendidos — estático mientras no haya endpoint específico */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#3b2a2a] text-sm">Productos más vendidos</h2>
                <span className="text-[#c8a87a] text-xs cursor-pointer hover:underline">ver todos</span>
              </div>
              <p className="text-xs text-[#9a8a8a] text-center py-4">Próximamente disponible</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
            <h2 className="font-bold text-[#3b2a2a] text-sm mb-4">Ventas en los últimos 7 días</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={ventasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ede8e0" />
                <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#7a6a6a" }} />
                <YAxis hide />
                <Line type="monotone" dataKey="ventas" stroke="#c0392b" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

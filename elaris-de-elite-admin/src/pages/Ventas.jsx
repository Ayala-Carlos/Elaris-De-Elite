import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/BarraLateral.jsx";
import StatCard from "../components/TarjetaEstadistica.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

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

const COMPLETED_STATUSES = ["completed", "Completado"];

const CATEGORY_COLORS = ["#c8a87a", "#e8a0a0", "#6e5d50", "#3b2a2a", "#d94a4a", "#a3d2a5", "#3b82f6", "#f4d03f"];

const filters = [
  { label: "7 días", days: 7 },
  { label: "30 días", days: 30 },
  { label: "3 meses", days: 90 },
  { label: "7 meses", days: 210 },
  { label: "Todo", days: null },
];

// Groups a set of orders into time buckets (day/week/month) depending on the selected range,
// returning the accumulated revenue (completed orders) and order count per bucket.
function buildTendencia(orders, days) {
  const unit = days === null ? "month" : days <= 30 ? "day" : "week";

  const bucketKey = (date) => {
    const d = new Date(date);
    if (unit === "day") {
      return d.toLocaleDateString("es-SV", { day: "2-digit", month: "2-digit" });
    }
    if (unit === "week") {
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      return weekStart.toLocaleDateString("es-SV", { day: "2-digit", month: "2-digit" });
    }
    return d.toLocaleDateString("es-SV", { month: "short", year: "2-digit" });
  };

  const buckets = new Map();

  orders.forEach((order) => {
    if (!order.orderDate) return;
    const key = bucketKey(order.orderDate);
    if (!buckets.has(key)) {
      buckets.set(key, { name: key, ingresos: 0, pedidos: 0, timestamp: new Date(order.orderDate).getTime() });
    }
    const bucket = buckets.get(key);
    bucket.pedidos += 1;
    if (COMPLETED_STATUSES.includes(order.orderStatus)) {
      bucket.ingresos += Number(order.cartId?.totalAmount) || 0;
    }
  });

  return Array.from(buckets.values()).sort((a, b) => a.timestamp - b.timestamp);
}

// Revenue per product category, based on completed orders' line items
function buildCategorias(orders, productCategoryMap) {
  const totals = {};

  orders
    .filter((order) => COMPLETED_STATUSES.includes(order.orderStatus))
    .forEach((order) => {
      (order.cartId?.products || []).forEach((item) => {
        const productId = item.productId?._id || item.productId;
        const categoria = productCategoryMap.get(String(productId)) || "Sin categoría";
        totals[categoria] = (totals[categoria] || 0) + (Number(item.subtotal) || 0);
      });
    });

  return Object.entries(totals)
    .map(([name, value], index) => ({ name, value, color: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

// Monthly revenue for the current year vs the previous year (completed orders only)
function buildComparacionAnual(orders) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const previousYear = currentYear - 1;
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const data = meses.map((mes) => ({ name: mes, actual: 0, anterior: 0 }));

  orders
    .filter((order) => order.orderDate && COMPLETED_STATUSES.includes(order.orderStatus))
    .forEach((order) => {
      const date = new Date(order.orderDate);
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const monto = Number(order.cartId?.totalAmount) || 0;

      if (year === currentYear) {
        data[monthIndex].actual += monto;
      } else if (year === previousYear) {
        data[monthIndex].anterior += monto;
      }
    });

  return { data, currentYear, previousYear };
}

export default function Ventas() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("30 días");
  const [orders, setOrders] = useState([]);
  const [productCategoryMap, setProductCategoryMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      setLoading(true);
      try {
        const [pedidosData, productosData] = await Promise.all([
          apiRequest("/orders"),
          apiRequest("/products"),
        ]);

        setOrders(Array.isArray(pedidosData) ? pedidosData : []);

        const map = new Map();
        (Array.isArray(productosData) ? productosData : []).forEach((p) => {
          map.set(String(p._id), p.idCategory?.name || "Sin categoría");
        });
        setProductCategoryMap(map);
      } catch (err) {
        setError(err.message || "No se pudieron cargar los datos de ventas");
      } finally {
        setLoading(false);
      }
    }
    cargarDatos();
  }, []);

  const filterDays = filters.find((f) => f.label === activeFilter)?.days ?? null;

  const filteredOrders = useMemo(() => {
    if (filterDays === null) return orders;
    const since = Date.now() - filterDays * 24 * 60 * 60 * 1000;
    return orders.filter((o) => o.orderDate && new Date(o.orderDate).getTime() >= since);
  }, [orders, filterDays]);

  const completedOrders = useMemo(
    () => filteredOrders.filter((o) => COMPLETED_STATUSES.includes(o.orderStatus)),
    [filteredOrders]
  );

  const stats = useMemo(() => {
    const ingresosTotales = completedOrders.reduce((sum, o) => sum + (Number(o.cartId?.totalAmount) || 0), 0);
    const totalPedidos = filteredOrders.length;
    const ticketPromedio = completedOrders.length > 0 ? ingresosTotales / completedOrders.length : 0;

    const hoy = new Date();
    const ventasDeHoy = orders
      .filter((o) => COMPLETED_STATUSES.includes(o.orderStatus) && o.orderDate)
      .filter((o) => new Date(o.orderDate).toDateString() === hoy.toDateString())
      .reduce((sum, o) => sum + (Number(o.cartId?.totalAmount) || 0), 0);

    return [
      { label: "Ingresos totales", value: `$${ingresosTotales.toFixed(2)}`, bg: "bg-[#a3d2a5]", icon: "💲" },
      { label: "Total pedidos", value: String(totalPedidos), bg: "bg-[#e5989b]", icon: "🛍" },
      { label: "Ticket promedio", value: `$${ticketPromedio.toFixed(2)}`, bg: "bg-[#f4d03f]", icon: "🎫" },
      { label: "Ventas de hoy", value: `$${ventasDeHoy.toFixed(2)}`, bg: "bg-[#2d3436]", icon: "📅" },
    ];
  }, [completedOrders, filteredOrders, orders]);

  const tendenciasData = useMemo(() => buildTendencia(filteredOrders, filterDays), [filteredOrders, filterDays]);
  const categoriasData = useMemo(
    () => buildCategorias(filteredOrders, productCategoryMap),
    [filteredOrders, productCategoryMap]
  );
  const { data: comparacionData, currentYear, previousYear } = useMemo(
    () => buildComparacionAnual(orders),
    [orders]
  );

  return (
    <div
      className="min-h-screen bg-[#f5f0eb]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Top navbar */}
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">

        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1
                className="text-2xl font-bold text-[#3b2a2a]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Ventas
              </h1>
              <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus ventas</p>
            </div>
            <button
              onClick={() => navigate("/descuentos")}
              className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
              Códigos de descuento
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
          )}

          {/* Filters */}
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`py-2 px-6 rounded-full text-sm transition-colors shadow-sm ${
                  activeFilter === filter.label
                    ? "bg-[#c8a87a] text-white font-bold"
                    : "bg-white text-[#7a6a6a] hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
             <StatCard
                key={s.label}
                label={s.label}
                value={loading ? "…" : s.value}
                icon={s.icon}
                bgVariant={s.bg}
              />
            ))}
          </div>

          {/* Middle row: Tendencias & Categorias */}
          <div className="grid grid-cols-2 gap-5">
            {/* Tendencias en las ventas */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 shadow-sm">
              <h2 className="font-bold text-[#3b2a2a] text-lg mb-6">
                Tendencias en las ventas
              </h2>
              {tendenciasData.length === 0 ? (
                <p className="text-sm text-[#9a8a8a] text-center py-16">Sin pedidos en este período</p>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={tendenciasData} margin={{ left: -10, right: 10, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#ede8e0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#7a6a6a" }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      yAxisId="ingresos"
                      tick={{ fontSize: 11, fill: "#3b82f6" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      yAxisId="pedidos"
                      orientation="right"
                      tick={{ fontSize: 11, fill: "#ef4444" }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip formatter={(value, key) => (key === "ingresos" ? `$${Number(value).toFixed(2)}` : value)} />
                    <Line
                      yAxisId="ingresos"
                      type="monotone"
                      dataKey="ingresos"
                      name="Ingresos ($)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      yAxisId="pedidos"
                      type="monotone"
                      dataKey="pedidos"
                      name="Pedidos"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Top categorias */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 shadow-sm">
              <h2 className="font-bold text-[#3b2a2a] text-lg mb-2">
                Top categorias
              </h2>
              {categoriasData.length === 0 ? (
                <p className="text-sm text-[#9a8a8a] text-center py-16">Sin ventas en este período</p>
              ) : (
                <div className="flex items-center justify-between h-[220px]">
                  <ResponsiveContainer width="60%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoriasData}
                        innerRadius={0}
                        outerRadius={85}
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {categoriasData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Custom Legend */}
                  <div className="flex flex-col gap-3 w-[40%] pl-4">
                    {categoriasData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-100"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-xs text-[#3b2a2a]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom row: Comparación anual */}
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 shadow-sm mb-4">
            <h2 className="font-bold text-[#3b2a2a] text-lg mb-6">
              Comparación anual
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={comparacionData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                barGap={0}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#7a6a6a" }}
                  axisLine={{ stroke: "#ede8e0", strokeWidth: 2 }}
                  tickLine={false}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Bar dataKey="actual" fill="#e8a0a0" radius={[0, 0, 0, 0]} barSize={16} />
                <Bar dataKey="anterior" fill="#c8a87a" radius={[0, 0, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>

            {/* Custom Bar Legend */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-[#c8a87a]"></div>
                <span className="text-xs text-[#7a6a6a]">{previousYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-[#e8a0a0]"></div>
                <span className="text-xs text-[#7a6a6a]">{currentYear}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Sidebar from "../components/BarraLateral.jsx";
import StatCard from "../components/TarjetaEstadistica.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
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
  Legend,
} from "recharts";


// Datos para la gráfica de Tendencias en las ventas
const tendenciasData = [
  { name: "2004", azul: 500, rojo: 100 },
  { name: "2005", azul: 800, rojo: 150 },
  { name: "2006", azul: 400, rojo: 800 },
  { name: "2007", azul: 700, rojo: 300 },
];

// Datos para la gráfica de Top categorías
const categoriasData = [
  { name: "Labiales", value: 35, color: "#c8a87a" },
  { name: "Rostro", value: 20, color: "#e8a0a0" },
  { name: "Bases", value: 10, color: "#6e5d50" },
  { name: "Brochas", value: 10, color: "#f9f6f0" },
  { name: "Perfumes", value: 25, color: "#d94a4a" },
];

// Datos para la gráfica de Comparación anual
const comparacionData = [
  { name: "6 meses", year2024: 600, year2025: 400 },
  { name: "6 meses", year2024: 500, year2025: 350 },
  { name: "6 meses", year2024: 800, year2025: 500 },
  { name: "6 meses", year2024: 900, year2025: 600 },
];

const stats = [
  { label: "Ingresos totales", value: "$34,543", bg: "bg-[#a3d2a5]", icon: "💲" },
  { label: "Total pedidos", value: "534", bg: "bg-[#e5989b]", icon: "🛍" },
  { label: "Ticket promedio", value: "$123.99", bg: "bg-[#f4d03f]", icon: "🎫" },
  { label: "Ventas diarias", value: "$2,432", bg: "bg-[#2d3436]", icon: "📅" },
];

const filters = ["7 días", "30 días", "3 meses", "7 meses", "Todo"];

export default function Ventas() {
  const [active, setActive] = useState("Ventas");
  const [activeFilter, setActiveFilter] = useState("30 días");

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
            <button className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
              Codigós de descuento
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`py-2 px-6 rounded-full text-sm transition-colors shadow-sm ${
                  activeFilter === filter
                    ? "bg-[#c8a87a] text-white font-bold"
                    : "bg-white text-[#7a6a6a] hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
             <StatCard 
                key={s.label}
                label={s.label}
                value={s.value}
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
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={tendenciasData} margin={{ left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#ede8e0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#7a6a6a" }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#7a6a6a" }}
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 2000]}
                  />
                  <Line
                    type="monotone"
                    dataKey="azul"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="rojo"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top categorias */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 shadow-sm">
              <h2 className="font-bold text-[#3b2a2a] text-lg mb-2">
                Top categorias
              </h2>
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
                  tick={{ fontSize: 11, fill: "#7a6a6a", angle: -45 }}
                  axisLine={{ stroke: "#ede8e0", strokeWidth: 2 }}
                  tickLine={false}
                  dy={15}
                  dx={-15}
                />
                <YAxis hide />
                <Bar dataKey="year2025" fill="#e8a0a0" radius={[0, 0, 0, 0]} barSize={40} />
                <Bar dataKey="year2024" fill="#c8a87a" radius={[0, 0, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Custom Bar Legend */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-[#c8a87a]"></div>
                <span className="text-xs text-[#7a6a6a]">2024</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-[#e8a0a0]"></div>
                <span className="text-xs text-[#7a6a6a]">2025</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
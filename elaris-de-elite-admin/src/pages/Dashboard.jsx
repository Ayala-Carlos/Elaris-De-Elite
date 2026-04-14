import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TopNavbar from "../components/TopNavBar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const ventasData = [
  { dia: "L", ventas: 120 },
  { dia: "M", ventas: 80 },
  { dia: "M", ventas: 150 },
  { dia: "J", ventas: 60 },
  { dia: "V", ventas: 200 },
  { dia: "S", ventas: 90 },
  { dia: "D", ventas: 130 },
  { dia: "L", ventas: 40 },
  { dia: "M", ventas: 170 },
  { dia: "M", ventas: 110 },
  { dia: "J", ventas: 190 },
  { dia: "V", ventas: 70 },
  { dia: "S", ventas: 160 },
  { dia: "D", ventas: 100 },
];

const pedidos = [
  { nombre: "Maria García", orden: "ORD-001 - 02-28-2026", monto: "$54.99", estado: "Completado", color: "text-[#c0a080]" },
  { nombre: "Maria García", orden: "ORD-001 - 02-28-2026", monto: "$54.99", estado: "En proceso", color: "text-[#e8a090]" },
  { nombre: "Maria García", orden: "ORD-001 - 02-28-2026", monto: "$54.99", estado: "Incompleta", color: "text-[#c0392b]" },
];

const productos = [
  { num: 1, nombre: "Base premiun pink fly", ventas: "143 ventas", monto: "$12,155" },
  { num: 2, nombre: "Perfume signature elite", ventas: "94 ventas", monto: "$16,920" },
  { num: 3, nombre: "Rubor compacto iluminador", ventas: "63 ventas", monto: "$4,725" },
];

const stats = [
  { label: "Ventas", value: "$43,234", bg: "bg-[#c8a87a]", icon: "💲" },
  { label: "Productos", value: "123", bg: "bg-[#e8a0a0]", icon: "✦" },
  { label: "Clientes", value: "1933", bg: "bg-[#8a8a8a]", icon: "👥" },
  { label: "Pedidos", value: "432", bg: "bg-[#c0392b]", icon: "🛍" },
];

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div
      className="min-h-screen bg-[#f5f0eb]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Top navbar */}
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header */}
          <div>
            <h1
              className="text-2xl font-bold text-[#3b2a2a]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Dashboard
            </h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Resumen general de la tienda</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3">
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

          {/* Middle row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Pedidos recientes */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#3b2a2a] text-sm">Pedidos recientes</h2>
                <span className="text-[#c8a87a] text-xs cursor-pointer hover:underline">ver todos</span>
              </div>
              <div className="flex flex-col gap-3">
                {pedidos.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-[#3b2a2a]">{p.nombre}</p>
                        <p className="text-xs text-[#7a6a6a]">{p.orden}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#3b2a2a]">{p.monto}</p>
                        <p className={`text-xs font-semibold ${p.color}`}>{p.estado}</p>
                      </div>
                    </div>
                    {i < pedidos.length - 1 && (
                      <div className="border-t border-[#ede8e0] mt-3" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Productos más vendidos */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#3b2a2a] text-sm">Productos mas vendidos</h2>
                <span className="text-[#c8a87a] text-xs cursor-pointer hover:underline">ver todos</span>
              </div>
              <div className="flex flex-col gap-3">
                {productos.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#c8a87a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {p.num}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#3b2a2a]">{p.nombre}</p>
                        <p className="text-xs text-[#7a6a6a]">{p.ventas}</p>
                      </div>
                      <p className="text-sm font-bold text-[#3b2a2a]">{p.monto}</p>
                    </div>
                    {i < productos.length - 1 && (
                      <div className="border-t border-[#ede8e0] mt-3" />
                    )}
                  </div>
                ))}
              </div>
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
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#c0392b"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
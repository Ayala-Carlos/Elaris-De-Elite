import { useState } from 'react';
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import SearchFilterBar from "../components/BarraBusqueda.jsx"; // <--- Importamos el componente

const clientes = [
  {
    nombre: "Arturo Mendez",
    email: "arturoexample@gmail.com",
    ubicacion: "El Salvador, San Salvador, Zona Rosa",
    telefono: "+503 6035-6077",
    pedidos: 12,
    gastado: "$656.00",
    desde: "29/11/2024",
    activo: true,
  },
  {
    nombre: "María López",
    email: "maria.lopez@gmail.com",
    ubicacion: "El Salvador, Santa Ana, Centro",
    telefono: "+503 7712-3344",
    pedidos: 8,
    gastado: "$421.50",
    desde: "15/01/2025",
    activo: true,
  },
  {
    nombre: "Carlos Rivas",
    email: "carlosrivas@hotmail.com",
    ubicacion: "El Salvador, San Miguel, Col. Médica",
    telefono: "+503 6099-8821",
    pedidos: 21,
    gastado: "$1,240.00",
    desde: "03/06/2024",
    activo: false,
  },
  {
    nombre: "Ana Martínez",
    email: "anamartinez@gmail.com",
    ubicacion: "El Salvador, La Libertad, Antiguo Cuscatlán",
    telefono: "+503 7845-6612",
    pedidos: 5,
    gastado: "$198.75",
    desde: "20/03/2025",
    activo: true,
  },
];

function getInitials(nombre) {
  return nombre
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Clientes() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const clientesFiltrados = clientes.filter((c) => {
    const coincideBusqueda = c.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFiltro =
      filtro === "Todos" ||
      (filtro === "Activos" && c.activo) ||
      (filtro === "Inactivos" && !c.activo);
    return coincideBusqueda && coincideFiltro;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Clientes</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus clientes</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total clientes", value: "4235" },
              { label: "Nuevos este mes", value: "142" },
              { label: "Valor total", value: "$65,434.00" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#ede8e0] p-5 shadow-sm">
                <p className="text-xs text-[#7a6a6a] mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-[#c8a87a]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/*Search & Filter Bar Componentizado */}
          <SearchFilterBar 
            placeholder="Ingrese el nombre cliente"
            filters={["Todos", "Activos", "Inactivos"]}
            activeFilter={filtro}
            onFilterClick={(f) => setFiltro(f)}
            onSearchChange={(val) => setBusqueda(val)}
          />

          {/* Clients grid */}
          <div className="grid grid-cols-2 gap-4">
            {clientesFiltrados.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Card top */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4ec9b0] flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(c.nombre)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#3b2a2a]">{c.nombre}</p>
                      <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full ${
                        c.activo ? "bg-[#4ec9b0] text-white" : "bg-[#e0e0e0] text-[#7a7a7a]"
                      }`}>
                        {c.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  {/* Iconos de contacto simplificados */}
                  <div className="space-y-2">
                    {[
                      { icon: "M2 4l10 7 10-7M2 20h20V4H2v16z", val: c.email },
                      { icon: "M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z", val: c.ubicacion },
                      { icon: "M22 17v3a2 2 0 01-2 2 20 20 0 01-9-3 20 20 0 01-7-7 20 20 0 01-3-9 2 2 0 012-2h3", val: c.telefono }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-[#7a6a6a]">
                        <svg className="w-3.5 h-3.5 text-[#c8a87a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item.val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card bottom stats */}
                <div className="grid grid-cols-3 border-t border-[#ede8e0] bg-[#faf8f6]">
                  {[
                    { label: "Pedidos", val: c.pedidos },
                    { label: "Gastado", val: c.gastado },
                    { label: "Desde", val: c.desde },
                  ].map((s, j) => (
                    <div key={j} className={`py-3 text-center ${j < 2 ? "border-r border-[#ede8e0]" : ""}`}>
                      <p className="text-[10px] font-bold text-[#3b2a2a] uppercase tracking-wider">{s.label}</p>
                      <p className="text-xs text-[#7a6a6a] mt-0.5">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
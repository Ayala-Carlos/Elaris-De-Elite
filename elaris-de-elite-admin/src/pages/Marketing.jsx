import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importar useNavigate
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";
import DataTable from "../components/DataTable";
import SearchFilterBar from "../components/SearchFilterBar";

const campanasList = [
  {
    id: 1,
    nombre: "Campaña invierno",
    plataforma: "Facebook",
    presupuesto: "$352.99",
    fechaInicio: "01/12/2026",
    fechaFinal: "07/12/2026",
    estado: "Activa", // Este campo es para que funcione el filtro
  },
  {
    id: 2,
    nombre: "Lanzamiento fragancias",
    plataforma: "Instagram",
    presupuesto: "$500.00",
    fechaInicio: "15/12/2026",
    fechaFinal: "30/12/2026",
    estado: "Inactiva",
  },
];

export default function CampanasMarketing() {
  const navigate = useNavigate(); // <-- Hook de navegación
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Lógica de filtrado
  const campanasFiltradas = campanasList.filter((campana) => {
    const coincideTexto = campana.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    
    // Si el filtro es "Todos", los muestra todos. Si no, quita la "s" final (Activas -> Activa) para comparar.
    const estadoLimpio = filtroEstado === "Activas" ? "Activa" : "Inactiva";
    const coincideEstado = filtroEstado === "Todos" || campana.estado === estadoLimpio;
    
    return coincideTexto && coincideEstado;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          {/* Header con título y botón de agregar */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#3b2a2a]">Campañas de marketing</h1>
              <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus campañas de marketing</p>
            </div>
            <button 
              onClick={() => navigate("/marketing/agregar")}
              className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-sm">
              Agregar campaña
            </button>
          </div>

          {/* Stats Cards - Ajustado a 3 columnas según el diseño */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total de campañas", value: "23" },
              { label: "Campañas activas", value: "18" },
              { label: "Campañas inactivas", value: "5" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#9a8a8a] font-medium mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-[#c8a87a]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search Bar - Con los filtros apropiados para campañas */}
          <SearchFilterBar 
            placeholder="Ingrese el nombre de la campaña"
            onSearchChange={(val) => setTextoBusqueda(val)}
          />

          {/* Data Table */}
          <DataTable
            headers={["Nombre de la campaña", "plataforma", "Presupuesto", "Fecha de inicio", "Fecha final", "Acciones"]}
            // Ajustamos las proporciones para que "Nombre" tenga más espacio
            gridCols="grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr]" 
            data={campanasFiltradas}
            renderRow={(campana) => (
              <>
                <div className="font-bold text-[#3b2a2a] pl-2">{campana.nombre}</div>
                <div className="text-[#5a4a4a] font-medium">{campana.plataforma}</div>
                <div className="text-[#5a4a4a] font-medium">{campana.presupuesto}</div>
                <div className="text-[#7a6a6a] text-sm">{campana.fechaInicio}</div>
                <div className="text-[#7a6a6a] text-sm">{campana.fechaFinal}</div>
                
                {/* Acciones: Editar (Dorado) y Eliminar (Rojo) */}
                <div className="flex justify-center gap-4">
                  <button className="text-[#c8a87a] hover:text-[#b8986a] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                  <button className="text-[#ef4444] hover:text-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
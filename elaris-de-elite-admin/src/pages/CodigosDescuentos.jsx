import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";
import DataTable from "../components/DataTable";
import SearchFilterBar from "../components/SearchFilterBar";

const codigosList = [
  {
    id: 1,
    codigo: "VERANO2026",
    porcentaje: "5%",
    fechaExpiracion: "04/24/26",
    estado: "Activo",
    limiteUso: "56",
  },
  // Puedes agregar más códigos aquí para probar el listado
];

export default function CodigosDescuento() {
  const navigate = useNavigate();
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Lógica de filtrado
  const codigosFiltrados = codigosList.filter((item) => {
    const coincideTexto = item.codigo.toLowerCase().includes(textoBusqueda.toLowerCase());
    
    // Si el filtro es "Todos", los muestra todos. 
    // Adapta esto si tienes estados como "Activos" y "Expirados" en tu select.
    const estadoLimpio = filtroEstado === "Activos" ? "Activo" : "Expirado";
    const coincideEstado = filtroEstado === "Todos" || item.estado === estadoLimpio;
    
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
              <h1 className="text-2xl font-bold text-[#65554f]">Códigos de descuento</h1>
              <p className="text-sm text-[#8a7a7a] mt-0.5">Gestione sus códigos de descuento</p>
            </div>
            {/* Nota: En el diseño original dice "Agregar códigp" (con un error de tipeo). Lo he corregido a "código" */}
            <button 
              onClick={() => navigate("/descuentos/agregar")}
              className="bg-[#d2ab7e] hover:bg-[#c29b6e] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-sm">
              Agregar código
            </button>
          </div>

          {/* Stats Cards - Ajustado a 3 columnas según el diseño */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total de códigos", value: "23" },
              { label: "Códigos activos", value: "18" },
              { label: "Códigos expirados", value: "5" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#9a8a8a] font-medium mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-[#d2ab7e]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <SearchFilterBar 
            placeholder="Ingrese el nombre del código"
            onSearchChange={(val) => setTextoBusqueda(val)}
            // Suponiendo que tu componente acepta un prop para el estado actual del filtro select
            // filterValue={filtroEstado}
            // onFilterChange={(val) => setFiltroEstado(val)}
          />

          {/* Data Table */}
          <DataTable
            headers={["Código", "Porcentaje de descuento", "Fecha de expiracion", "Estado", "Limite de uso", "Acciones"]}
            // Ajustamos las proporciones para alinear todo similar al diseño
            gridCols="grid-cols-[1.5fr_2fr_1.5fr_1fr_1fr_1fr]" 
            data={codigosFiltrados}
            renderRow={(item) => (
              <>
                <div className="font-bold text-[#65554f] text-sm pl-2 uppercase">{item.codigo}</div>
                <div className="text-[#65554f] font-medium text-sm text-center">{item.porcentaje}</div>
                <div className="text-[#65554f] font-medium text-sm text-center">{item.fechaExpiracion}</div>
                
                {/* Píldora de estado */}
                <div className="flex justify-center">
                  <span className={`px-4 py-1 text-xs font-semibold rounded-full text-white ${
                    item.estado === "Activo" ? "bg-[#a3ceac]" : "bg-[#ef4444]" // Verde para activo, rojo para expirado
                  }`}>
                    {item.estado}
                  </span>
                </div>

                <div className="text-[#65554f] font-medium text-sm text-center">{item.limiteUso}</div>
                
                {/* Acciones: Editar (Dorado) y Eliminar (Rojo) */}
                <div className="flex justify-center gap-4">
                  <button className="text-[#d2ab7e] hover:text-[#c29b6e] transition-colors">
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
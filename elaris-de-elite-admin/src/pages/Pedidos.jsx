import { useState } from "react";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import DataTable from "../components/TablaDatos.jsx";
import SearchFilterBar from "../components/BarraNavegacion.jsx";

const pedidosList = [
  {
    id: "ORD-0001",
    cliente: "María García",
    email: "mariaexample@gmail.com",
    fecha: "26/02/2026",
    cantidad: 4,
    total: "$345.00",
    status: "Completado",
  },
  // agregar más objetos aquí para probar el scroll
];

export default function Pedidos() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Lógica de filtrado
  const pedidosFiltrados = pedidosList.filter((pedido) => {
    const coincideTexto = pedido.id.toLowerCase().includes(textoBusqueda.toLowerCase()) || 
                          pedido.cliente.toLowerCase().includes(textoBusqueda.toLowerCase());
    const coincideEstado = filtroEstado === "Todos" || pedido.status === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Pedidos</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione su pedidos</p>
          </div>

          {/* Stats Cards - Siguiendo tu imagen de referencia */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total pedidos", value: "3", color: "text-[#c8a87a]" },
              { label: "Pendientes", value: "10", color: "text-yellow-500" },
              { label: "En proceso", value: "23", color: "text-red-400" },
              { label: "Completados", value: "42", color: "text-green-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#9a8a8a] font-medium">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <SearchFilterBar 
            placeholder="Ingrese el nombre pedido"
            filters={["Todos", "Pendiente", "En proceso", "Completado"]}
            activeFilter={filtroEstado}
            onFilterClick={(f) => setFiltroEstado(f)}
            onSearchChange={(val) => setTextoBusqueda(val)}
          />

          {/* Data Table de Pedidos */}
          <DataTable
            headers={["ID", "Cliente", "Fecha", "Cantidad", "Total", "Estado", "Acciones"]}
            gridCols="grid-cols-[1.2fr_2fr_1.2fr_1fr_1.2fr_1.2fr_0.8fr]"
            data={pedidosFiltrados}
            renderRow={(pedido) => (
              <>
                <div className="text-[#7a6a6a] font-medium">{pedido.id}</div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#3b2a2a] leading-tight">{pedido.cliente}</span>
                  <span className="text-[10px] text-[#9a8a8a]">{pedido.email}</span>
                </div>
                <div className="text-[#7a6a6a] text-sm">{pedido.fecha}</div>
                <div className="text-[#3b2a2a] font-medium text-center">{pedido.cantidad}</div>
                <div className="text-[#3b2a2a] font-bold">{pedido.total}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm ${
                    pedido.status === "Completado" ? "bg-[#a3d2a5]" : 
                    pedido.status === "Pendiente" ? "bg-yellow-400" : "bg-red-300"
                  }`}>
                    {pedido.status}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button className="text-[#3b2a2a] hover:text-[#c8a87a] transition-colors p-2 bg-[#f5f0eb] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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
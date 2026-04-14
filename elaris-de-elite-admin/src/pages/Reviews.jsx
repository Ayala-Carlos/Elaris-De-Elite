import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";
import SearchFilterBar from "../components/SearchFilterBar"; // Importamos el componente

const stats = [
  { label: "Total de reseñas", value: "23" },
  { label: "Reseñas activas", value: "18" },
  { label: "Reseñas inactivas", value: "5" },
];

const reviewsData = [
  {
    id: 1,
    name: "Maria Reyes",
    stars: 5,
    orderId: "423345",
    date: "23-03-2026",
    comment:
      "Excelente fragancia, muy duradera y elegante. Perfecta para ocasiones especiales.",
  },
  {
    id: 2,
    name: "Juan Perez",
    stars: 4,
    orderId: "423346",
    date: "24-03-2026",
    comment:
      "Muy buen producto, aunque el empaque llegó un poco presionado.",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? "text-[#f4d03f]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Resenas() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  // Lógica de filtrado por nombre/ID y por Estrellas
  const reviewsFiltradas = reviewsData.filter((r) => {
    const coincideTexto = 
      r.name.toLowerCase().includes(busqueda.toLowerCase()) || 
      r.orderId.includes(busqueda);
    
    const coincideEstrellas = 
      filtro === "Todos" || 
      r.stars === parseInt(filtro);

    return coincideTexto && coincideEstrellas;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />

      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Reseñas</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione las reseñas de los clientes</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#7a6a6a] mb-1">{s.label}</p>
                <p className="text-xl font-bold text-[#c8a87a]">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Buscador Estandarizado */}
          <SearchFilterBar 
            placeholder="Ingrese el nombre de usuario o ID de compra"
            filters={["Todos", "5", "4", "3"]} // Filtros por estrellas
            activeFilter={filtro}
            onFilterClick={(f) => setFiltro(f)}
            onSearchChange={(val) => setBusqueda(val)}
          />

          {/* Reviews List */}
          <div className="flex flex-col gap-4">
            {reviewsFiltradas.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#ede8e0] relative flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <button className="absolute top-6 right-6 text-[#ef4444] hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                <h2 className="text-lg font-bold text-[#3b2a2a]">{review.name}</h2>
                <StarRating rating={review.stars} />

                <div className="flex gap-8 text-[13px] text-[#9a8a8a] font-medium">
                  <p>ID DE COMPRA: <span className="text-[#c8a87a]">{review.orderId}</span></p>
                  <p>FECHA: <span className="text-[#c8a87a]">{review.date}</span></p>
                </div>

                <p className="text-[#5a4a4a] mt-2 text-[15px] leading-relaxed pr-10 italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
            
            {reviewsFiltradas.length === 0 && (
              <div className="text-center py-10 text-[#7a6a6a]">
                No se encontraron reseñas con esos criterios.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
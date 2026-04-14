import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";
import DataTable from "../components/DataTable";
import SearchFilterBar from "../components/SearchFilterBar";

const productosList = [
  {
    id: 1,
    title: "Base premium pink fly",
    subtitle: "",
    category: "Rostro",
    price: "$75.00",
    status: "Disponible",
    rating: 4.8,
    hasActions: true, // El primero en tu imagen no tiene acciones
    imgBg: "bg-[#f5c6cb]",
  },
  {
    id: 2,
    title: "Paleta de sombras Handbag",
    subtitle: "Rabanne",
    category: "Rostro",
    price: "$75.00",
    status: "Disponible",
    rating: 4.8,
    hasActions: true,
    imgBg: "bg-[#e2e2e2]",
  },
  {
    id: 3,
    title: "Perfume Signature Elite",
    subtitle: "",
    category: "Rostro",
    price: "$75.00",
    status: "Disponible",
    rating: 4.8,
    hasActions: true,
    imgBg: "bg-[#f9dada]",
  },
  {
    id: 4,
    title: "Rubor compacto iluminador",
    subtitle: "",
    category: "Fragancias",
    price: "$75.00",
    status: "Disponible",
    rating: 4.8,
    hasActions: true,
    imgBg: "bg-[#2a2a2a]",
  },
  {
    id: 5,
    title: "Máscara de pestañas volumen",
    subtitle: "",
    category: "Rostro",
    price: "$75.00",
    status: "Disponible",
    rating: 4.8,
    hasActions: true,
    imgBg: "bg-[#4a4a4a]",
  },
  {
    id: 6,
    title: "Cookie and Tickle Shimmer Finish Powder Highlighters (Benefit)",
    subtitle: "",
    category: "Rostro",
    price: "$75.00",
    status: "Disponible",
    rating: 4.8,
    hasActions: true,
    imgBg: "bg-[#d4cfc9]",
  },
];

export default function Productos() {
  const [active, setActive] = useState("Productos");

  // 1. ESTADOS PARA LA BÚSQUEDA Y FILTROS
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // 2. LÓGICA DE FILTRADO (La magia)
  const productosFiltrados = productosList.filter((prod) => {
    // Filtrar por texto (nombre)
    const coincideTexto = prod.title.toLowerCase().includes(textoBusqueda.toLowerCase());
    
    // Filtrar por botón de estado
    const coincideEstado = filtroEstado === "Todos" || prod.status === filtroEstado;

    return coincideTexto && coincideEstado;
  });

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
        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1
                className="text-2xl font-bold text-[#3b2a2a]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Productos
              </h1>
              <p className="text-sm text-[#7a6a6a] mt-0.5">
                Gestione sus productos
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
                Categorías y marcas
              </button>
              <button className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
                Agregar producto
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchFilterBar 
          placeholder="Ingrese el nombre del producto"
          filters={["Todos", "Disponible", "No Disponible"]}
          activeFilter={filtroEstado}
          onFilterClick={(nuevoFiltro) => setFiltroEstado(nuevoFiltro)}
          
          // ¡ESTA LÍNEA ES LA QUE HACE QUE FUNCIONE EL BUSCADOR!
          onSearchChange={(valor) => setTextoBusqueda(valor)} 
          />

          {/* Data Table */}
          <DataTable
            headers={["Producto", "Categoria", "Precio", "Estado", "Valoración", "Acciones"]}
            gridCols="grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1fr]"
            data={productosFiltrados} // <--- ¡Importante!
            renderRow={(product) => (
              <>
                <div className="flex items-center gap-4 pr-4">
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 ${product.imgBg}`}></div>
                  <div className="flex flex-col">
                    {product.subtitle && <span className="text-xs font-bold text-[#7a6a6a]">{product.subtitle}</span>}
                    <span className="font-bold text-[#3b2a2a] leading-tight">{product.title}</span>
                  </div>
                </div>
                <div className="text-[#5a4a4a] font-medium">{product.category}</div>
                <div className="text-[#5a4a4a] font-medium">{product.price}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    product.status === "Disponible" ? "bg-[#a3d2a5]" : "bg-red-300"
                  }`}>
                    {product.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[#5a4a4a]">
                   ⭐ {product.rating}
                </div>

                {/* Acciones: AHORA CONTROLAN FUNCIONES LOCALES DE ESTA PÁGINA */}
                <div className="flex items-center justify-center gap-3">
                  {product.hasActions && (
                    <>
                      <button className="text-[#3b2a2a] hover:text-[#c8a87a]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button 
                        onClick={() => handleEdit(product)} // <--- ¡Llama al modal de editar producto!
                        className="text-[#c8a87a] hover:text-[#b8986a]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} // <--- ¡Elimina un producto!
                        className="text-[#ef4444] hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          />

        </div>
      </div>
    </div>
  );
}
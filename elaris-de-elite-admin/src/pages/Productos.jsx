  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import Sidebar from "../components/BarraLateral.jsx";
  import TopNavbar from "../components/BarraNavegacion.jsx";
  import DataTable from "../components/TablaDatos.jsx";
  import SearchFilterBar from "../components/BarraBusqueda.jsx";
  
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
  
  export default function Productos() {
    const navigate = useNavigate();
    const [productosList, setProductosList] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      cargarProductos();
    }, []);
  
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/products");
        setProductosList(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir este cambio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c8a87a",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await apiRequest(`/products/${id}`, { method: "DELETE" });
            setProductosList((prev) => prev.filter((p) => p._id !== id));
          
            Swal.fire({
              title: "Eliminado",
              text: "El producto ha sido eliminado correctamente.",
              icon: "success",
              confirmButtonColor: "#c8a87a"
            });
          } catch (err) {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el producto: " + err.message,
              icon: "error",
              confirmButtonColor: "#c8a87a"
            });
          }
        }
      });
    };
  
    const productosFiltrados = productosList.filter((prod) => {
      const nombre = prod.name || prod.nombre || prod.title || "";
      const estado = prod.stock > 0 ? "Disponible" : "No Disponible";
      const coincideTexto = nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideEstado = filtroEstado === "Todos" || estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  
    return (
      <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <TopNavbar />
  
        <div className="flex gap-0 px-4 pb-6">
          <Sidebar />
  
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-[#3b2a2a]">Productos</h1>
                <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione sus productos</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/productos/categoriasymarcas")}
                  className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Categorías y marcas
                </button>
                <button
                  onClick={() => navigate("/productos/agregar")}
                  className="bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Agregar producto
                </button>
              </div>
            </div>
  
            <SearchFilterBar
              placeholder="Ingrese el nombre del producto"
              filters={["Todos", "Disponible", "No Disponible"]}
              activeFilter={filtroEstado}
              onFilterClick={(f) => setFiltroEstado(f)}
              onSearchChange={(v) => setTextoBusqueda(v)}
            />
  
            {loading ? (
              <p className="text-center text-[#9a8a8a] py-10">Cargando productos...</p>
            ) : error ? (
              <p className="text-center text-red-400 py-10">{error}</p>
            ) : (
              <DataTable
                headers={["Producto", "Categoría", "Marca", "Precio", "Estado", "Acciones"]}
                gridCols="grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1fr]"
                data={productosFiltrados}
                renderRow={(product) => {
                  const nombre = product.name || "—";
                  const categoria = product.idCategory?.name || "—";
                  const marca = product.idBrand?.name || "—";
                  const precio = product.price != null ? `$${product.price}` : "—";
                  const disponible = (product.stock ?? 0) > 0;
                  const estado = disponible ? "Disponible" : "No Disponible";
                  const imgUrl = product.images?.[0]?.image || null;
  
                  return (
                    <>
                      <div className="flex items-center gap-4 pr-4">
                        <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden bg-[#f5c6cb]">
                          {imgUrl ? (
                            <img src={imgUrl} alt={nombre} className="w-full h-full object-cover" />
                          ) : null}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#3b2a2a] leading-tight">{nombre}</span>
                        </div>
                      </div>
                      <div className="text-[#5a4a4a] font-medium">{categoria}</div>
                      <div className="text-[#5a4a4a] font-medium">{marca}</div>
                      <div className="text-[#5a4a4a] font-medium">{precio}</div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${disponible ? "bg-[#a3d2a5]" : "bg-red-300"}`}>
                          {estado}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => navigate(`/productos/editar/${product._id}`)}
                          className="text-[#c8a87a] hover:text-[#b8986a]"
                          title="Editar Producto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-[#ef4444] hover:text-red-600"
                          title="Eliminar Producto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </>
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
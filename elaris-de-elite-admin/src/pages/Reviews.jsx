import { useState, useEffect } from "react";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
import SearchFilterBar from "../components/BarraBusqueda.jsx";
import Swal from "sweetalert2"; // Importamos SweetAlert2

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

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < rating ? "text-[#f4d03f]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Resenas() {
  const [reviews, setReviews] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/reviews")
      .then((data) => {
        const listaReviews = data.reviews || (Array.isArray(data) ? data : []);
        setReviews(listaReviews);
      })
      .catch(() => setError("No se pudieron cargar las reseñas."))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id) => {
    // Alerta de confirmación personalizada con SweetAlert2
    Swal.fire({
      title: "¿Eliminar esta reseña?",
      text: "Esta acción removerá el comentario de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#7a6a6a",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#ffffff"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/reviews/${id}`, { method: "DELETE" });
          setReviews((prev) => prev.filter((r) => r._id !== id));
          
          // Toast o notificación rápida de éxito
          Swal.fire({
            title: "¡Eliminada!",
            text: "La reseña ha sido removida con éxito.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        } catch (err) {
          // Captura de errores en el borrado
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la reseña: " + err.message,
            icon: "error"
          });
        }
      }
    });
  };

  const reviewsFiltradas = reviews.filter((r) => {
    const nombre = r.idClient?.name || "";
    const orderId = r.idOrder?._id || r.idOrder || "";
    
    const coincideTexto =
      nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(orderId).includes(busqueda);
      
    const estrellas = r.rating || 0;
    const coincideEstrellas = filtro === "Todos" || estrellas === parseInt(filtro);
    return coincideTexto && coincideEstrellas;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">Reseñas</h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">Gestione las reseñas de los clientes</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Total de reseñas", value: String(reviews.length) },
              { label: "Promedio de estrellas", value: reviews.length ? (reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1) : "—" },
              { label: "Con 5 estrellas", value: String(reviews.filter((r) => (r.rating) === 5).length) },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#ede8e0]">
                <p className="text-xs text-[#7a6a6a] mb-1">{s.label}</p>
                <p className="text-xl font-bold text-[#c8a87a]">{s.value}</p>
              </div>
            ))}
          </div>

          <SearchFilterBar
            placeholder="Ingrese el nombre de usuario o ID de compra"
            filters={["Todos", "5", "4", "3"]}
            activeFilter={filtro}
            onFilterClick={(f) => setFiltro(f)}
            onSearchChange={(val) => setBusqueda(val)}
          />

          {loading ? (
            <p className="text-center text-[#9a8a8a] py-10">Cargando reseñas...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviewsFiltradas.map((review) => {
                const nombre = review.idClient?.name || "Anónimo";
                const estrellas = review.rating || 0;
                const orderId = review.idOrder?._id || review.idOrder || "—";
                const fechaOrigen = review.reviewDate || review.createdAt;
                const fecha = fechaOrigen ? new Date(fechaOrigen).toLocaleDateString("es-SV") : "—";
                const comentario = review.comment || "";

                return (
                  <div key={review._id} className="bg-white rounded-2xl p-6 shadow-sm border border-[#ede8e0] relative flex flex-col gap-3 hover:shadow-md transition-shadow">
                    <button 
                      onClick={() => handleEliminar(review._id)} 
                      className="absolute top-6 right-6 text-[#ef4444] hover:scale-110 transition-transform"
                      title="Eliminar reseña"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <h2 className="text-lg font-bold text-[#3b2a2a]">{nombre}</h2>
                    <StarRating rating={estrellas} />
                    <div className="flex gap-8 text-[13px] text-[#9a8a8a] font-medium">
                      <p>ID DE COMPRA: <span className="text-[#c8a87a]">{orderId !== "—" ? String(orderId).slice(-6).toUpperCase() : "—"}</span></p>
                      <p>FECHA: <span className="text-[#c8a87a]">{fecha}</span></p>
                    </div>
                    {comentario && (
                      <p className="text-[#5a4a4a] mt-2 text-[15px] leading-relaxed pr-10 italic">"{comentario}"</p>
                    )}
                  </div>
                );
              })}
              {reviewsFiltradas.length === 0 && (
                <div className="text-center py-10 text-[#7a6a6a]">No se encontraron reseñas con esos criterios.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
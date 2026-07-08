import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Boton from "../components/Boton.jsx";
import { Star, Truck, ShieldCheck, RotateCcw, Zap, Minus, Plus, X } from "lucide-react";
import { useProduct } from "../hooks/useProduct.js";
import { useProductReviews } from "../hooks/useProductReviews.js";
import { useAuth } from "../hooks/useAuth.js";
import { useCart } from "../hooks/useCart.js";
import { useOrderHistory } from "../hooks/useOrderHistory.js";

const StarRating = ({ rating, onSelect, interactive = false }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          fill={(interactive ? (hovered || rating) >= star : rating >= star) ? "#D4A017" : "none"}
          stroke="#D4A017"
          className={interactive ? "cursor-pointer" : ""}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onSelect && onSelect(star)}
        />
      ))}
    </div>
  );
};

const formatFecha = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { product, loading, error } = useProduct(id);
  const { reviews, submitReview } = useProductReviews(id);
  const { orders } = useOrderHistory(user?._id);

  const haComprado = orders.some((order) =>
    (order.cartId?.products || []).some(
      (p) => (p.productId?._id || p.productId)?.toString() === id
    )
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaReseña, setNuevaReseña] = useState({ rating: 0, comentario: "" });
  const [reseñaError, setReseñaError] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [addError, setAddError] = useState("");
  const [addedMsg, setAddedMsg] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
          <p className="text-sm text-gray-400">Cargando producto...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
          <p>Producto no encontrado</p>
        </main>
        <Footer />
      </div>
    );
  }

  const promedio = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const handleAgregarAlCarrito = async () => {
    setAddError("");
    setAddedMsg("");
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await addItem(product._id, cantidad);
      setAddedMsg("Producto agregado al carrito");
    } catch (err) {
      setAddError(err.message);
    }
  };

  const handleEnviarReseña = async () => {
    if (!user) {
      setModalAbierto(false);
      navigate("/login");
      return;
    }
    if (!haComprado) {
      setReseñaError("Solo puedes reseñar productos que hayas comprado.");
      return;
    }
    if (nuevaReseña.rating === 0) {
      setReseñaError("Selecciona una calificación");
      return;
    }
    if (nuevaReseña.comentario.trim().length < 5) {
      setReseñaError("La reseña debe tener al menos 5 caracteres");
      return;
    }

    setReseñaError("");
    try {
      await submitReview({
        idClient: user._id,
        rating: nuevaReseña.rating,
        comment: nuevaReseña.comentario,
      });
      setNuevaReseña({ rating: 0, comentario: "" });
      setModalAbierto(false);
    } catch (err) {
      setReseñaError(err.message);
    }
  };

  const categoria = product.idCategory?.name?.toUpperCase() || "SIN CATEGORÍA";
  const imagen = product.images?.[0]?.image;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-4">
          Inicio / {categoria} / {product.name}
        </p>
        <Link to="/productos" className="text-sm text-[#D4A574] mb-6 inline-block">
          ← Volver
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Imagen */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5CA]">
            <img
              src={imagen}
              alt={product.name}
              className="w-full h-[400px] object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-[#D4A574] font-semibold mb-2">{categoria}</p>
            <h1 className="text-2xl font-bold text-[#6B5B4E] mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(Math.round(promedio))].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {promedio.toFixed(1)} | {reviews.length} Reseñas
              </span>
            </div>

            {/* Precio */}
            <p className="text-2xl font-semibold text-[#6B5B4E] mb-6">
              ${Number(product.price).toFixed(2)}
            </p>

            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 border p-2 rounded-lg text-sm">
                <Truck size={16} /> Envío gratis
              </div>
              <div className="flex items-center gap-2 border p-2 rounded-lg text-sm">
                <ShieldCheck size={16} /> Envío seguro
              </div>
              <div className="flex items-center gap-2 border p-2 rounded-lg text-sm">
                <RotateCcw size={16} /> Devoluciones
              </div>
              <div className="flex items-center gap-2 border p-2 rounded-lg text-sm">
                <Zap size={16} /> Entrega rápida
              </div>
            </div>

            {/* Descripción */}
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">{product.description}</p>

            {/* Cantidad */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className="w-8 h-8 border rounded-full flex items-center justify-center"
                onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
              >
                <Minus size={14} />
              </button>
              <span>{cantidad}</span>
              <button
                className="w-8 h-8 border rounded-full flex items-center justify-center"
                onClick={() => setCantidad(cantidad + 1)}
              >
                <Plus size={14} />
              </button>
            </div>

            {addError && <p className="text-xs text-red-500 mb-3">{addError}</p>}
            {addedMsg && <p className="text-xs text-green-600 mb-3">{addedMsg}</p>}

            {/* Botón */}
            <Boton tipo="primario" className="px-8" onClick={handleAgregarAlCarrito}>
              Agregar al carrito
            </Boton>
          </div>
        </div>

        {/* ── SECCIÓN RESEÑAS ── */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#6B5B4E] mb-6">Reseñas de los clientes</h2>

          <div className="flex flex-col gap-4 mb-8">
            {reviews.length === 0 && (
              <p className="text-sm text-gray-400">Aún no hay reseñas para este producto.</p>
            )}
            {reviews.map((r) => (
              <div key={r._id} className="bg-white rounded-xl p-5 shadow-sm border border-[#E8D5CA]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-[#6B5B4E]">{r.idClient?.name || "Usuario"}</span>
                  <span className="text-xs bg-[#C8E6C9] text-[#388E3C] px-2 py-0.5 rounded-full">
                    Cuenta verificada
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={r.rating} />
                  <span className="text-xs text-gray-400">{formatFecha(r.reviewDate || r.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>

          {/* Botón abrir modal */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                if (!haComprado) return;
                setModalAbierto(true);
              }}
              disabled={user && !haComprado}
              className="bg-[#C49A6C] hover:bg-[#b38a5c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-10 py-3 rounded-full transition-colors"
            >
              Agregar reseña
            </button>
            {user && !haComprado && (
              <p className="text-xs text-gray-400">
                Solo puedes reseñar productos que hayas comprado.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* ── MODAL RESEÑA ── */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-xl">
            {/* Cerrar */}
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-[#6B5B4E] mb-5">Escribe tu reseña</h3>

            {/* Selector estrellas */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating
                rating={nuevaReseña.rating}
                interactive
                onSelect={(star) => setNuevaReseña((prev) => ({ ...prev, rating: star }))}
              />
              {nuevaReseña.rating > 0 && (
                <span className="text-sm text-gray-500">
                  {nuevaReseña.rating} {nuevaReseña.rating === 1 ? "estrella" : "estrellas"}
                </span>
              )}
            </div>

            {/* Textarea */}
            <textarea
              rows={7}
              placeholder="Escribe tu experiencia con el producto..."
              value={nuevaReseña.comentario}
              onChange={(e) =>
                setNuevaReseña((prev) => ({ ...prev, comentario: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4A574] mb-4"
            />

            {reseñaError && <p className="text-xs text-red-500 mb-4 text-center">{reseñaError}</p>}

            {/* Botón enviar */}
            <div className="flex justify-center">
              <button
                onClick={handleEnviarReseña}
                disabled={!nuevaReseña.comentario.trim() || nuevaReseña.rating === 0}
                className="bg-[#C49A6C] hover:bg-[#b38a5c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-12 py-3 rounded-full transition-colors"
              >
                Enviar reseña
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;

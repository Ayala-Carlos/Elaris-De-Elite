import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Boton from "../components/Boton.jsx";
import { Star, Truck, ShieldCheck, RotateCcw, Zap, Minus, Plus, X } from "lucide-react";
import BasePremiun from "../img/BasePremiunPinkFly.png";
import HandBag from "../img/PaletaSombrasHandBag.png";
import FraganciaElite from "../img/PerfumeSignature.png";
import RuborIluminador from "../img/RuborCompacto.png";
import MascaraPestanas from "../img/MascaraPestañas.png";
import CookieHighlight from "../img/Highliters.png";

const productos = [
  {
    id: "1",
    nombre: "Base premiun pink fly",
    categoria: "LABIALES",
    precio: 85,
    descripcion: "Base de maquillaje de alta cobertura con acabado mate y larga duración.",
    imagen: BasePremiun,
    rating: 5,
    reviews: 432,
  },
  {
    id: "2",
    categoria: "OJOS",
    nombre: "Rabanne Paleta de sombras Handbag",
    precio: 50,
    imagen: HandBag,
    descripcion: "Paleta de sombras de alta calidad con una amplia gama de colores.",
    rating: 4,
    reviews: 210,
  },
  {
    id: "3",
    categoria: "FRAGANCIAS",
    nombre: "Perfume Signature Elite",
    precio: 180,
    imagen: FraganciaElite,
    descripcion: "Fragancia elegante y sofisticada con notas florales y amaderadas.",
    rating: 5,
    reviews: 320,
  },
  {
    id: "4",
    categoria: "ROSTRO",
    nombre: "Rubor compacto iluminador",
    precio: 75,
    imagen: RuborIluminador,
    descripcion: "Rubor compacto con partículas iluminadoras para un brillo natural.",
    rating: 4,
    reviews: 150,
  },
  {
    id: "5",
    categoria: "OJOS",
    nombre: "Máscara de pestañas volumen",
    precio: 68,
    imagen: MascaraPestanas,
    descripcion: "Máscara de pestañas que proporciona volumen extremo y definición.",
    rating: 5,
    reviews: 500,
  },
  {
    id: "6",
    categoria: "ROSTRO",
    nombre: "Cookie Highlight",
    precio: 39,
    imagen: CookieHighlight,
    descripcion: "Iluminador en polvo con un acabado radiante y duradero.",
    rating: 4,
    reviews: 180,
  },
];

const reseñasIniciales = [
  {
    id: 1,
    nombre: "Maria Reyes",
    fecha: "23-03-2026",
    rating: 4,
    comentario: "Excelente fragancia, muy duradera y elegante. Perfecta para ocasiones especiales.",
  },
  {
    id: 2,
    nombre: "Francisca Ayala",
    fecha: "3-03-2026",
    rating: 4,
    comentario: "Excelente fragancia, muy duradera y elegante. Perfecta para ocasiones especiales.",
  },
];

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

const ProductoDetalle = () => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === id);

  const [reseñas, setReseñas] = useState(reseñasIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaReseña, setNuevaReseña] = useState({ rating: 0, comentario: "" });
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const handleEnviarReseña = () => {
    if (!nuevaReseña.comentario.trim() || nuevaReseña.rating === 0) return;
    const hoy = new Date();
    const fecha = `${hoy.getDate()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${hoy.getFullYear()}`;
    setReseñas([
      ...reseñas,
      {
        id: Date.now(),
        nombre: "Usuario",
        fecha,
        rating: nuevaReseña.rating,
        comentario: nuevaReseña.comentario,
      },
    ]);
    setNuevaReseña({ rating: 0, comentario: "" });
    setModalAbierto(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-4">
          Inicio / {producto.categoria} / {producto.nombre}
        </p>
        <Link to="/productos" className="text-sm text-[#D4A574] mb-6 inline-block">
          ← Volver
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Imagen */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5CA]">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-[400px] object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-[#D4A574] font-semibold mb-2">{producto.categoria}</p>
            <h1 className="text-2xl font-bold text-[#6B5B4E] mb-2">{producto.nombre}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(producto.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {producto.rating}.0 | {producto.reviews} Reseñas
              </span>
            </div>

            {/* Precio */}
            <p className="text-2xl font-semibold text-[#6B5B4E] mb-6">
              ${producto.precio.toFixed(2)}
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
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">{producto.descripcion}</p>

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

            {/* Botón */}
            <Boton tipo="primario" className="px-8">
              <Link to="/carrito">Agregar al carrito</Link>
            </Boton>
          </div>
        </div>

        {/* ── SECCIÓN RESEÑAS ── */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#6B5B4E] mb-6">Reseñas de los clientes</h2>

          <div className="flex flex-col gap-4 mb-8">
            {reseñas.map((r) => (
              <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm border border-[#E8D5CA]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-[#6B5B4E]">{r.nombre}</span>
                  <span className="text-xs bg-[#C8E6C9] text-[#388E3C] px-2 py-0.5 rounded-full">
                    Cuenta verificada
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={r.rating} />
                  <span className="text-xs text-gray-400">{r.fecha}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.comentario}</p>
              </div>
            ))}
          </div>

          {/* Botón abrir modal */}
          <div className="flex justify-center">
            <button
              onClick={() => setModalAbierto(true)}
              className="bg-[#C49A6C] hover:bg-[#b38a5c] text-white font-medium px-10 py-3 rounded-full transition-colors"
            >
              Agregar reseña
            </button>
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
              className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4A574] mb-6"
            />

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

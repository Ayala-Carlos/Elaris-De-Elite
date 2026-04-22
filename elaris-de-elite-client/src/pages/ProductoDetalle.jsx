import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Boton from "../components/Boton.jsx";
import { Star, Truck, ShieldCheck, RotateCcw, Zap, Minus, Plus } from "lucide-react";
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
    descripcion:
      "Base de maquillaje de alta cobertura con acabado mate y larga duración.",
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
    descripcion:
      "Paleta de sombras de alta calidad con una amplia gama de colores.",
    rating: 4,
    reviews: 210,
  },
 {
    id: "3",
    categoria: "FRAGANCIAS",
    nombre: "Perfume Signature Elite",
    precio: 180,
    imagen: FraganciaElite,
    descripcion:
      "Fragancia elegante y sofisticada con notas florales y amaderadas.",
    rating: 5,
    reviews: 320,
  },
  {
    id: "4",
    categoria: "ROSTRO",
    nombre: "Rubor compacto iluminador",
    precio: 75,
    imagen: RuborIluminador,
    descripcion:
      "Rubor compacto con partículas iluminadoras para un brillo natural.",
    rating: 4,
    reviews: 150,
  },
  {
    id: "5",
    categoria: "OJOS",
    nombre: "Máscara de pestañas volumen",
    precio: 68,
    imagen: MascaraPestanas,
    descripcion:
      "Máscara de pestañas que proporciona volumen extremo y definición.",
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
  }
];

const ProductoDetalle = () => {
  const { id } = useParams();

  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

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
            <p className="text-sm text-[#D4A574] font-semibold mb-2">
              {producto.categoria}
            </p>

            <h1 className="text-2xl font-bold text-[#6B5B4E] mb-2">
              {producto.nombre}
            </h1>

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
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {producto.descripcion}
            </p>

            {/* Cantidad */}
            <div className="flex items-center gap-4 mb-6">
              <button className="w-8 h-8 border rounded-full flex items-center justify-center">
                <Minus size={14} />
              </button>
              <span>1</span>
              <button className="w-8 h-8 border rounded-full flex items-center justify-center">
                <Plus size={14} />
              </button>
            </div>

            {/* Botón */}
            <Boton tipo="primario" className="px-8">
              <Link to="/carrito">
                Agregar al carrito
              </Link>
            </Boton>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductoDetalle;
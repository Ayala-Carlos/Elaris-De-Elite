import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaProducto from "../components/TarjetaProducto.jsx";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";


//Imagenes
import BasePremiun from "../img/BasePremiunPinkFly.png";
import HandBag from "../img/PaletaSombrasHandBag.png";
import FraganciaElite from "../img/PerfumeSignature.png";
import RuborIluminador from "../img/RuborCompacto.png";
import MascaraPestanas from "../img/MascaraPestañas.png";
import CookieHighlight from "../img/Highliters.png";

// Datos mock (datos de ejemplo)
const productos = [
  {
    id: 1,
    categoria: "LABIALES",
    nombre: "Base premium pink fly",
    precio: 85,
    img: BasePremiun,
  },
  {
    id: 2,
    categoria: "OJOS",
    nombre: "Rabanne Paleta de sombras Handbag",
    precio: 50,
    img: HandBag,
  },
  {
    id: 3,
    categoria: "FRAGANCIAS",
    nombre: "Perfume Signature Elite",
    precio: 180,
    img: FraganciaElite,
  },
  {
    id: 4,
    categoria: "ROSTRO",
    nombre: "Rubor compacto iluminador",
    precio: 75,
    img: RuborIluminador,
  },
  {
    id: 5,
    categoria: "OJOS",
    nombre: "Máscara de pestañas volumen",
    precio: 68,
    img: MascaraPestanas,
  },
  {
    id: 6,
    categoria: "ROSTRO",
    nombre: "Cookie Highlight",
    precio: 39,
    img: CookieHighlight,
  },
];

const Productos = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-[#D4A574] text-sm mb-2">Nuestra colección</p>
          <h1 className="text-3xl font-bold text-[#6B5B4E] mb-3">
            Productos de Lujo
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Descubre nuestra exclusiva selección de maquillaje de alta gama,
            diseñada para realzar tu belleza natural con productos excepcionales.
          </p>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <aside className="space-y-10 mr-20 -ml-20">

            {/* Categorías */}
            <div >
              <h3 className="font-bold text-[#6B5B4E] mb-3">Categorías</h3>
              <ul className="space-y-2 text-sm">
                <li className="bg-[#D4A574] text-white px-3 py-1 rounded">TODOS</li>
                <li className="text-[#6B5B4E]">LABIALES</li>
                <li className="text-[#6B5B4E]">OJOS</li>
                <li className="text-[#6B5B4E]">ROSTRO</li>
                <li className="text-[#6B5B4E]">ACCESORIOS</li>
                <li className="text-[#6B5B4E]">FRAGANCIAS</li>
              </ul>
            </div>

            {/* Precio */}
            <div>
              <h3 className="font-bold text-[#6B5B4E] mb-3">Precio</h3>
              <ul className="space-y-2 text-sm">
                <li className="bg-[#E89B9B] text-white px-3 py-1 rounded">Todos</li>
                <li className="text-[#6B5B4E]">Menos de $75</li>
                <li className="text-[#6B5B4E]">$75 - $100</li>
              </ul>
            </div>

          </aside>

          {/* PRODUCTOS */}
          <section className="md:col-span-3">
            <p className="text-xs text-gray-400 mb-4">Productos encontrados</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {productos.map((p) => (
                <TarjetaProducto key={p.id} producto={p} />
              ))}

            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Productos;
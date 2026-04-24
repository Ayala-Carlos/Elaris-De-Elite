import React, { useState } from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaProducto from "../components/TarjetaProducto.jsx";

// Imágenes
import BasePremiun from "../img/BasePremiunPinkFly.png";
import HandBag from "../img/PaletaSombrasHandBag.png";
import FraganciaElite from "../img/PerfumeSignature.png";
import RuborIluminador from "../img/RuborCompacto.png";
import MascaraPestanas from "../img/MascaraPestañas.png";
import CookieHighlight from "../img/Highliters.png";

const productos = [
  { id: 1, categoria: "LABIALES", nombre: "Base premium pink fly", precio: 85, img: BasePremiun },
  { id: 2, categoria: "OJOS", nombre: "Paleta Handbag", precio: 50, img: HandBag },
  { id: 3, categoria: "FRAGANCIAS", nombre: "Perfume Signature Elite", precio: 180, img: FraganciaElite },
  { id: 4, categoria: "ROSTRO", nombre: "Rubor iluminador", precio: 75, img: RuborIluminador },
  { id: 5, categoria: "OJOS", nombre: "Máscara volumen", precio: 68, img: MascaraPestanas },
  { id: 6, categoria: "ROSTRO", nombre: "Cookie Highlight", precio: 39, img: CookieHighlight },
];

const categorias = ["TODOS", "LABIALES", "OJOS", "ROSTRO", "ACCESORIOS", "FRAGANCIAS"];
const precios = ["TODOS", "MENOR_75", "ENTRE_75_100"];

const Productos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("TODOS");
  const [precioActivo, setPrecioActivo] = useState("TODOS");

  // FILTRO COMBINADO
  const productosFiltrados = productos.filter((p) => {
    const cumpleCategoria =
      categoriaActiva === "TODOS" || p.categoria === categoriaActiva;

    const cumplePrecio =
      precioActivo === "TODOS" ||
      (precioActivo === "MENOR_75" && p.precio < 75) ||
      (precioActivo === "ENTRE_75_100" && p.precio >= 75 && p.precio <= 100);

    return cumpleCategoria && cumplePrecio;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 py-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-[#D4A574] text-sm mb-2">Nuestra colección</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#6B5B4E] mb-3">
            Productos de Lujo
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Descubre nuestra exclusiva selección de maquillaje de alta gama.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="flex lg:block gap-6 overflow-x-auto pb-2">

              {/* Categorías */}
              <div className="min-w-[150px]">
                <h3 className="font-bold text-[#6B5B4E] mb-3">Categorías</h3>
                <ul className="space-y-2 text-sm">
                  {categorias.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setCategoriaActiva(cat)}
                        className={`px-3 py-1 rounded w-full text-left transition ${
                          categoriaActiva === cat
                            ? "bg-[#D4A574] text-white"
                            : "text-[#6B5B4E] hover:bg-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precio */}
              <div className="min-w-[150px]">
                <h3 className="font-bold text-[#6B5B4E] mb-3">Precio</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button
                      onClick={() => setPrecioActivo("TODOS")}
                      className={`px-3 py-1 rounded w-full text-left ${
                        precioActivo === "TODOS"
                          ? "bg-[#E89B9B] text-white"
                          : "text-[#6B5B4E] hover:bg-gray-200"
                      }`}
                    >
                      Todos
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setPrecioActivo("MENOR_75")}
                      className={`px-3 py-1 rounded w-full text-left ${
                        precioActivo === "MENOR_75"
                          ? "bg-[#E89B9B] text-white"
                          : "text-[#6B5B4E] hover:bg-gray-200"
                      }`}
                    >
                      Menos de $75
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setPrecioActivo("ENTRE_75_100")}
                      className={`px-3 py-1 rounded w-full text-left ${
                        precioActivo === "ENTRE_75_100"
                          ? "bg-[#E89B9B] text-white"
                          : "text-[#6B5B4E] hover:bg-gray-200"
                      }`}
                    >
                      $75 - $100
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          </aside>

          {/* PRODUCTOS */}
          <section className="lg:col-span-3">
            <p className="text-xs text-gray-400 mb-4">
              {productosFiltrados.length} productos encontrados
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.map((p) => (
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
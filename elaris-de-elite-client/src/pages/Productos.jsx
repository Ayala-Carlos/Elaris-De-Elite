import React, { useState } from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaProducto from "../components/TarjetaProducto.jsx";
import Encabezado from "../components/Encabezado.jsx";
import { useProducts } from "../hooks/useProducts.js";

const Productos = () => {
  const { products, categories, loading, error } = useProducts();
  const [categoriaActiva, setCategoriaActiva] = useState("TODOS");
  const [precioActivo, setPrecioActivo] = useState("TODOS");

  // FILTRO COMBINADO
  const productosFiltrados = products.filter((p) => {
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

        <Encabezado textoSuperior="Nuestra colección"
          titulo="Productos de Lujo"
          textoInferior="Descubre nuestra exclusiva selección de maquillaje de alta gama.">
        </Encabezado>

        <div className="grid gap-8 lg:grid-cols-4">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="flex lg:block gap-6 overflow-x-auto pb-2">

              {/* Categorías */}
              <div className="min-w-[150px]">
                <h3 className="font-bold text-[#6B5B4E] mb-3">Categorías</h3>
                <ul className="space-y-2 text-sm">
                  {categories.map((cat) => (
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
            {loading && <p className="text-sm text-gray-400 mb-4">Cargando productos...</p>}
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

            {!loading && !error && (
              <>
                <p className="text-xs text-gray-400 mb-4">
                  {productosFiltrados.length} productos encontrados
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productosFiltrados.map((p) => (
                    <TarjetaProducto key={p.id} producto={p} />
                  ))}
                </div>
              </>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Productos;

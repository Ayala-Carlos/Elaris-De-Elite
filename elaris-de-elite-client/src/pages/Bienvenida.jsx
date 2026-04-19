import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import modelo from "../img/modelo.png";

const Bienvenida = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-[#DE4B52] mb-2">
          ÉLARIS DE ÉLITE
        </h1>

        <p className="italic text-[#DE4B52] mb-4">
          “Tu poder, tu belleza”
        </p>

        <p className="text-[#6B5B4E] max-w-xl mx-auto text-sm mb-6">
          Descubre nuestra exclusiva colección de maquillaje de alta gama,
          diseñada para realzar tu belleza natural con productos de lujo excepcionales.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-[#D4A574] text-white px-6 py-2 rounded-md">
            Explorar colección
          </button>

          <button className="border border-[#D4A574] text-[#6B5B4E] px-6 py-2 rounded-md">
            Ver novedades
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center">
        
        <img
          src={modelo}
          alt="model"
          className="w-full h-[300px] object-contain rounded-lg"
        />

        <div>
          <h4 className="text-[#D4A574] mb-2">Sobre nosotros</h4>

          <h2 className="text-3xl font-bold text-[#6B5B4E] mb-4">
            Élaris de Élite
          </h2>

          <p className="text-sm text-[#6B5B4E] mb-4">
            Somos una marca de maquillaje de alta gama comprometida con la excelencia y la elegancia.
            Cada producto es cuidadosamente formulado con ingredientes premium para ofrecer resultados excepcionales.
          </p>

          <p className="text-sm text-[#6B5B4E] mb-8">
            Nuestra filosofía “Tu poder, tu belleza” refleja nuestra creencia de que el maquillaje es una herramienta
            de empoderamiento que realza tu belleza natural y única.
          </p>

          {/* Stats */}
          <div className="flex justify-between mt-6">
            <div>
              <h3 className="text-2xl font-bold text-[#D4A574]">100+</h3>
              <p className="text-sm text-[#6B5B4E]">Productos</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#D4A574]">50+</h3>
              <p className="text-sm text-[#6B5B4E]">Clientes</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#D4A574]">15+</h3>
              <p className="text-sm text-[#6B5B4E]">Años</p>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default Bienvenida;
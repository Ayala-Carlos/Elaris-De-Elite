import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import modelo from "../img/modelo.png";
import Boton from "../components/Boton.jsx";
import { Link } from "react-router-dom";

const Bienvenida = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Navbar />
      <section className="text-center py-14 px-6 ">
        <h1 className="text-4xl font-bold text-[#DE4B52] mb-2 tracking-widest font-serif">
          ÉLARIS DE ÉLITE
        </h1>
        <p className="italic text-[#DE4B52] text-sm mb-4">
          "Tu poder, tu belleza"
        </p>
        <p className="text-[#6B5B4E] max-w-md mx-auto text-sm mb-7 leading-relaxed">
          Descubre nuestra exclusiva colección de maquillaje de alta gama,
          diseñada para realzar tu belleza natural con productos de lujo
          excepcionales.
        </p>
        <div className="flex justify-center gap-4">
          <Boton tipo="primario">
            <Link to="/productos"> Explorar colección </Link>
          </Boton>
          <Boton tipo="secundario">
            <Link to="/novedades"> Ver novedades </Link>
          </Boton>
        </div>
      </section>
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 
         grid md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Imagen */}
        <div className="w-full">
          <img
            src={modelo}
            alt="model"
            className="w-full h-[300px] sm:h-[400px] md:h-[450px] 
            object-cover rounded-xl shadow-sm"
          />
        </div>

        {/* Texto */}
        <div className="max-w-xl mx-auto md:mx-0">
          <p className="text-[#D4A574] text-sm mb-3">Sobre nosotros</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#6B5B4E] mb-4 font-serif">
            Élaris de Élite
          </h2>

          <p className="text-sm text-[#6B5B4E] mb-4 leading-relaxed">
            Somos una marca de maquillaje de alta gama comprometida con la
            excelencia y la elegancia. Cada producto es cuidadosamente formulado
            con ingredientes premium para ofrecer resultados excepcionales.
          </p>

          <p className="text-sm text-[#6B5B4E] leading-relaxed">
            Nuestra filosofía "Tu poder, tu belleza" refleja nuestra creencia de
            que el maquillaje es una herramienta de empoderamiento que realza tu
            belleza natural y única.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 pt-4 border-t border-[#E8D5CA] text-center md:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#D4A574]">
                100+
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5B4E]">Productos</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#D4A574]">
                50K+
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5B4E]">Clientes</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#D4A574]">
                15+
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5B4E]">Años</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bienvenida;
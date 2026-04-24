import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";

const Nosotros = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col font-sans text-[#6B5B4E]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        
        {/* Encabezado Simple */}
        <div className="text-center mb-10">
          <p className="text-[#D4A574] text-sm mb-2">Nuestra esencia</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#6B5B4E] mb-3">
            Sobre Élaris de Élite
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Descubre la esencia de Élaris de Élite, una marca de maquillaje premium que celebra la belleza auténtica y el empoderamiento femenino.
          </p>
        </div>

        {/* Sección de Texto*/}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F3C1C6] rounded-full"></span>
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              Élaris de Élite es una marca dedicada a la curaduría de maquillaje premium. 
              No solo vendemos productos; seleccionamos herramientas que realzan la belleza 
              natural y fortalecen la confianza de cada mujer. Nos mueve la calidad, 
              la estética y la honestidad en cada detalle.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4A574] rounded-full"></span>
              Nuestra Historia
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              Nacimos de la necesidad de encontrar cosméticos de alta gama que realmente 
              entendieran el mercado latinoamericano. Desde el primer día, nuestra visión 
              ha sido crear un espacio elegante y sofisticado donde la experiencia de 
              compra sea tan importante como el producto final.
            </p>
          </div>
        </div>

        {/* Banner de Sector*/}
        <div className="bg-white p-10 rounded-[2rem] mb-20 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Sector y mercado</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Nos enfocamos exclusivamente en la cosmética premium. Nuestro público son 
              mujeres que no solo buscan maquillaje, sino una marca que represente 
              sus valores de estilo, autenticidad y empoderamiento personal.
            </p>
          </div>
          <div className="bg-[#F3C1C6] text-[#6B5B4E] px-6 py-4 rounded-2xl font-bold text-center">
             Calidad 100% <br/> Certificada
          </div>
        </div>

        {/* Diferenciadores*/}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-10">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              { title: "Curaduría", desc: "Selección rigurosa de marcas.", color: "#F3C1C6" },
              { title: "Estética", desc: "Diseño sofisticado y coherente.", color: "#D4A574" },
              { title: "Confianza", desc: "Seguridad en cada aplicación.", color: "#F3C1C6" },
              { title: "Digital", desc: "Experiencia de compra intuitiva.", color: "#D4A574" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: item.color }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400 px-2">{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Nosotros;
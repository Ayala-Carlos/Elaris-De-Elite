import React, { useState } from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import { AlertCircle, Package, CreditCard, Truck } from "lucide-react";

const secciones = [
  {
    icon: <AlertCircle size={20} className="text-[#DE4B52]" />,
    iconBg: "bg-[#fdecea]",
    titulo: "Bienvenido a Élaris de Elite",
    texto:
      "Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Élaris de Elite. Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Élaris de Elite si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.",
  },
  {
    icon: <Package size={20} className="text-[#6B5B4E]" />,
    iconBg: "bg-[#e8e0da]",
    titulo: "1. Licencia de Uso",
    texto:
      "A menos que se indique lo contrario, Élaris de Elite y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Élaris de Elite. Todos los derechos de propiedad intelectual están reservados. Puedes acceder a esto desde Élaris de Elite para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.",
  },
  {
    icon: <CreditCard size={20} className="text-[#C49A6C]" />,
    iconBg: "bg-[#f5e9da]",
    titulo: "2. Comprar y pagos",
    texto:
      "A menos que se indique lo contrario, Élaris de Elite y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Élaris de Elite. Todos los derechos de propiedad intelectual están reservados. Puedes acceder a esto desde Élaris de Elite para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.",
  },
  {
    icon: <Truck size={20} className="text-[#C49A6C]" />,
    iconBg: "bg-[#f5e9da]",
    titulo: "3. Envíos y Devoluciones",
    texto:
      "Los plazos de entrega varían según tu ubicación. Los productos pueden ser devueltos dentro de los 30 días posteriores a la recepción, siempre que estén en su estado original y sin usar.",
  },
];

const TerminosCondiciones = () => {
  // start with the first section open but allow toggling it closed
  const [abierto, setAbierto] = useState(0);

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        {/* Encabezado */}
        <p className="text-center text-sm text-[#DE4B52] font-medium mb-3 tracking-wide">
          Nuestros términos y condiciones
        </p>
        <h1 className="text-4xl font-bold text-[#6B5B4E] text-center mb-2 font-serif">
          Términos y condiciones
        </h1>
        <p className="text-center text-sm text-gray-400 mb-12">
          Última actualización: 5 de marzo de 2026
        </p>

        {/* Tarjetas */}
        <div className="flex flex-col gap-4">
          {secciones.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-[#E8D5CA] overflow-hidden"
            >
              {/* Cabecera clickeable */}
              <button
                onClick={() => setAbierto(abierto === i ? null : i)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#FAF8F5] transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
                  {s.icon}
                </div>
                <span className="font-semibold text-[#6B5B4E] text-sm flex-1">
                  {s.titulo}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${abierto === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Contenido expandible */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${abierto === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-sm text-gray-500 leading-relaxed px-5 pb-5">
                  {s.texto}
                </p>
              </div>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TerminosCondiciones;

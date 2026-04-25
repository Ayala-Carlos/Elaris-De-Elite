import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import { AlertCircle, Package, CreditCard, Truck } from "lucide-react";
import Encabezado from "../components/Encabezado.jsx";
import AcordeonLista from "../components/AcordeonLista.jsx";

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

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
       
        {/* Encabezado */}
        <p className="text-center text-sm text-[#DE4B52] font-medium mb-3 tracking-wide">
          Nuestras políticas de uso
        </p>
        <h1 className="text-4xl font-bold text-[#6B5B4E] text-center mb-2 ">
          Términos y condiciones
        </h1>
        <p className="text-center text-sm text-gray-400 mb-12 mt-4 leading-relaxed">
          Última actualización: 5 de marzo de 2026
        </p>

        {/* Tarjetas */}
        <div className="flex flex-col gap-4">
          <AcordeonLista secciones={secciones} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TerminosCondiciones;

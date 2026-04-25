import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Encabezado from "../components/Encabezado.jsx";
import { Link } from "react-router-dom";
import InfoContactoCard from "../components/InfoContactoCard.jsx";
import FormularioContacto from "../components/FormularioContacto.jsx";

const Contacto = () => {

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Navbar />
      <br />
      <Encabezado
        textoSuperior="Póngase en contacto con nosotros"
        titulo="Contáctenos"
        textoInferior="Estamos aquí para ayudarle. Envíanos un mensaje y te responderemos lo antes posible."
      />

      {/* CONTENIDO PRINCIPAL */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* COLUMNA IZQUIERDA — Info de contacto */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <InfoContactoCard
                titulo="Correo"
                lineas={["elarisdeelite@gmail.com"]}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    {" "}
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="3"
                      stroke="#DE4B52"
                      strokeWidth="1.5"
                    />{" "}
                    <path
                      d="M2 8l10 6 10-6"
                      stroke="#DE4B52"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />{" "}
                  </svg>
                }
              />

              <InfoContactoCard
                titulo="Teléfono"
                lineas={["(+503) 6035-6077", "(+503) 7119-1709"]}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    {" "}
                    <path
                      d="M6.5 2h11a1 1 0 011 1v18a1 1 0 01-1 1h-11a1 1 0 01-1-1V3a1 1 0 011-1z"
                      stroke="#DE4B52"
                      strokeWidth="1.5"
                    />{" "}
                    <circle cx="12" cy="19" r="1" fill="#DE4B52" />{" "}
                  </svg>
                }
              />

              <InfoContactoCard
                titulo="Ubicación"
                lineas={["La Libertad,", "Antiguo Cuscatlán"]}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="10" r="3" stroke="#DE4B52" strokeWidth="1.5" />
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="#DE4B52"
                      strokeWidth="1.5"
                    />
                  </svg>
                }
              />
            </div>

            {/* Síguenos */}
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: "#9C8275" }}
            >
              <p className="font-semibold text-white text-sm mb-1">Síguenos</p>
              <p className="text-[#E8D5CA] text-xs mb-4 leading-relaxed">
                Conéctate con nosotros en redes sociales para conocer las
                últimas novedades y promociones
              </p>
              <div className="flex gap-3">
                {/* X / Twitter */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A6560" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A6560" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A6560" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="white"
                      stroke="none"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA — Formulario */}
          <FormularioContacto />
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
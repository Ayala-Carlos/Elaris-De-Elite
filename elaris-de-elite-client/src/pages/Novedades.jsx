import React from "react";
//Componentes
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaNovedad from "../components/TarjetaNovedad.jsx";

// Imágenes
import Novedad1 from "../img/Novedad1.png";
import Novedad2 from "../img/Novedad2.png";
import Novedad3 from "../img/Novedad3.png";
import Novedad4 from "../img/Novedad4.png";


const novedades = [
    {
        id: 1,
        img: Novedad2,
        categoria: "Sostenibilidad",
        titulo: "Línea eco-luxury y sostenible",
        descripcion: "Presentamos nuestra nueva línea de productos con empaques 100% reciclables sin comprometer la calidad premium",
        fecha: "15 Feb 2026"
    },
    {
        id: 2,
        img: Novedad3,
        categoria: "Tutoriales",
        titulo: "Look natural de día",
        descripcion: "Aprende a crear un maquillaje fresco y elegante para cualquier ocasión usando productos estrella.",
        fecha: "21 Feb 2026"
    },
    {
        id: 3,
        img: Novedad4,
        categoria: "Eventos",
        titulo: "Evento exclusivo VIP",
        descripcion: "Únete a nuestro evento de lanzamiento con descuentos especiales y acceso anticipado.",
        fecha: "5 Feb 2026"
    }
];
const Novedades = () => {
    return (
        <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <p className="text-[#D4A574] text-sm mb-2">Mantente informado</p>
                    <h1 className="text-3xl font-bold text-[#6B5B4E] mb-3">
                        Noticias y novedades
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xl mx-auto">
                        Las últimas tendencias, lanzamientos y consejos de belleza directamente para ti.
                    </p>
                </div>

                {/* DESTACADO */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">

                    <img
                        src={Novedad1}
                        alt="coleccion"
                        className="w-full h-[260px] object-cover rounded-xl"
                    />

                    <div className="bg-white p-6 rounded-xl border border-[#E8D5CA] flex flex-col justify-center">
                        <span className="bg-[#E89B9B] text-white text-xs px-3 py-1 rounded-full w-fit mb-3">
                            Colecciones
                        </span>

                        <h2 className="text-xl font-bold text-[#6B5B4E] mb-3">
                            Nueva colección de primavera 2026
                        </h2>

                        <p className="text-sm text-gray-500 mb-4">
                            Descubre nuestra última colección de tonos vibrantes y acabados luminosos perfectos para la nueva estación.
                        </p>

                        <p className="text-xs text-[#D4A574]">22 Feb 2026</p>
                    </div>

                </div>

                {/* GRID INFERIOR */}
                <div className="grid md:grid-cols-3 gap-6">
                    {novedades.map((n) => (
                        <TarjetaNovedad key={n.id} novedad={n} />
                    ))}
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Novedades;

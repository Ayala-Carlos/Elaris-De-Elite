import React from "react";
//Componentes
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaNovedad from "../components/TarjetaNovedad.jsx";
import Encabezado from "../components/Encabezado.jsx";
import { useProducts } from "../hooks/useProducts.js";

// Imágenes
import Novedad1 from "../img/Novedad1.png";

const formatFecha = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
};

const Novedades = () => {
    const { products, loading } = useProducts();

    const novedades = [...products]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 3)
        .map((p) => ({
            id: p.id,
            img: p.img,
            categoria: p.categoria,
            titulo: p.nombre,
            descripcion: p.raw?.description || "Descubre este producto recién agregado a nuestra colección.",
            fecha: formatFecha(p.createdAt),
        }));

    return (
        <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
                <Encabezado textoSuperior="Mantente informado"
                    titulo="Noticias y Novedades"
                    textoInferior="Las últimas tendencias, lanzamientos y consejos de belleza directamente para ti." />

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
                {loading && <p className="text-sm text-gray-400">Cargando novedades...</p>}
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

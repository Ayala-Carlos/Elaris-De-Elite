import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaResenia from "../components/TarjetaResenia.jsx";
import Encabezado from "../components/Encabezado.jsx";
import EstadisticasReseñas from "../components/EstadisticasReseñas.jsx";
import { useReviews } from "../hooks/useReviews.js";

const iniciales = (nombre = "") =>
  nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "??";

const Resenias = () => {
  const { reviews, loading, error } = useReviews();

  const total = reviews.length;
  const promedio = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const satisfaccion = total ? Math.round((reviews.filter((r) => r.rating >= 4).length / total) * 100) : 0;
  const recomendacion = total ? Math.round((reviews.filter((r) => r.rating === 5).length / total) * 100) : 0;

  const stats = [
    { valor: promedio.toFixed(1), etiqueta: "Calificación", color: "#D4A574" },
    { valor: total.toLocaleString(), etiqueta: "Reseñas", color: "#DE4B52" },
    { valor: `${satisfaccion}%`, etiqueta: "Satisfacción", color: "#D4A574" },
    { valor: `${recomendacion}%`, etiqueta: "Recomendación", color: "#C9956B" },
  ];

  const resenias = reviews.map((r) => ({
    texto: `"${r.comment}"`,
    producto: r.idProduct?.name ? `Producto: ${r.idProduct.name}` : "Cliente Élaris de Élite",
    nombre: r.idClient?.name || "Cliente",
    rol: "Cliente Élaris de Élite",
    iniciales: iniciales(r.idClient?.name),
    estrellas: r.rating,
  }));

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Navbar />
      <br />
      <br />
      <Encabezado textoSuperior="Lo que dicen nuestros clientes"
       titulo="Reseñas y Testimonios"
       textoInferior="Descubre por qué Élaris de Élite es la marca de maquillaje premium más recomendada por profesionales y amantes de la belleza." />


      {/* STATS */}
      <section className="px-6 md:px-16 pb-10">
        <EstadisticasReseñas stats={stats}/>
      </section>

      {/* RESEÑAS GRID */}
      <section className="px-6 md:px-16 pb-16">
        {loading && <p className="text-sm text-gray-400 text-center">Cargando reseñas...</p>}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {!loading && !error && resenias.length === 0 && (
          <p className="text-sm text-gray-400 text-center">Aún no hay reseñas.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resenias.map((r, i) => (
            <TarjetaResenia key={i} data={r} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resenias;

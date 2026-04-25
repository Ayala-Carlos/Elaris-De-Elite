import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import TarjetaResenia from "../components/TarjetaResenia.jsx";
import Encabezado from "../components/Encabezado.jsx";
import EstadisticasReseñas from "../components/EstadisticasReseñas.jsx";

const resenias = [
  {
    texto:
      '"La calidad de estos productos es excepcional. Los tonos son elegantes y la duración es increíble. He probado muchas marcas de lujo y Élaris de Élite está entre las mejores."',
    producto: "Producto: Base pink fly",
    nombre: "María González",
    rol: "Maquilladora profesional",
    iniciales: "MG",
    estrellas: 5,
  },
  {
    texto:
      '"Me encanta! La textura es sedosa y el acabado impecable. Definitivamente recomiendo esta marca a todas mis seguidoras. La inversión vale totalmente la pena."',
    producto: "Producto: Paleta de sombra premium",
    nombre: "Ana Martínez",
    rol: "Influencer de Belleza",
    iniciales: "AM",
    estrellas: 5,
  },
  {
    texto:
      '"Desde que descubrí Élaris de Élite, no uso otra marca. Los productos son de altísima calidad y me hacen sentir elegante y poderosa cada día."',
    producto: "Producto: Perfume signature elite",
    nombre: "Carmen López",
    rol: "Cliente Frecuente",
    iniciales: "CL",
    estrellas: 5,
  },
  {
    texto:
      '"Como dermatóloga, aprecio que usen ingredientes premium y seguros. Recomiendo esta marca a mis pacientes que buscan productos de lujo sin comprometer la salud de su piel."',
    producto: "Producto: Sérum facial gold",
    nombre: "Dra. Patricia Vidal",
    rol: "Dermatóloga",
    iniciales: "PV",
    estrellas: 5,
  },
  {
    texto:
      '"La elegancia que estos productos aportan es incomparable. Perfectos para mujeres profesionales que buscan lo mejor. El servicio al cliente también es excepcional."',
    producto: "Producto: Labial velvet rouge",
    nombre: "Sofía Ramírez",
    rol: "Ejecutiva de Negocios",
    iniciales: "SR",
    estrellas: 5,
  },
  {
    texto:
      '"Como modelo, necesito productos que se vean impecables en cámara. Élaris de Élite siempre cumple. La cobertura es perfecta y los acabados son profesionales."',
    producto: "Producto: Contorno & highlight pro",
    nombre: "Valentina Cruz",
    rol: "Modelo Profesional",
    iniciales: "VC",
    estrellas: 5,
  },
];

const stats = [
  { valor: "5.0", etiqueta: "Calificación", color: "#D4A574" },
  { valor: "2,500+", etiqueta: "Reseñas", color: "#DE4B52" },
  { valor: "98%", etiqueta: "Satisfacción", color: "#D4A574" },
  { valor: "95%", etiqueta: "Recomendación", color: "#C9956B" },
];

const Resenias = () => {
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

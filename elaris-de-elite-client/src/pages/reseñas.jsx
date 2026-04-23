import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";

const estrellas = (n = 5) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? "#D4A574" : "#e0d0c4", fontSize: "16px" }}>
      ★
    </span>
  ));

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
  { valor: "5.0", etiqueta: "Calificación" },
  { valor: "2,500+", etiqueta: "Reseñas" },
  { valor: "98%", etiqueta: "Satisfacción" },
  { valor: "95%", etiqueta: "Recomendación" },
];

const Resenias = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Navbar />

      {/* ENCABEZADO */}
      <section className="text-center pt-14 pb-6 px-6">
        <p className="text-[#D4A574] text-sm tracking-widest mb-2">
          Lo que dicen nuestros clientes
        </p>
        <h1 className="text-4xl font-bold text-[#6B5B4E] font-serif mb-3">
          Reseñas y testimonios
        </h1>
        <p className="text-[#9C8275] text-sm max-w-lg mx-auto leading-relaxed">
          Historias reales de clientes que confían en la excelencia de Élaris de Élite
        </p>
      </section>

      {/* STATS */}
      <section className="px-6 md:px-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl text-center py-5 px-4"
              style={{ backgroundColor: "#F0E8E0" }}
            >
              <p
                className="text-2xl font-bold font-serif mb-1"
                style={{ color: i === 0 ? "#D4A574" : i === 1 ? "#DE4B52" : i === 2 ? "#D4A574" : "#C9956B" }}
              >
                {s.valor}
              </p>
              <p className="text-xs text-[#9C8275] tracking-wide">{s.etiqueta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESEÑAS GRID */}
      <section className="px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resenias.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{
                backgroundColor: "#F5EDE6",
                border: "1px solid #E8D5CA",
              }}
            >
              {/* Estrellas + ícono decorativo */}
              <div className="flex items-center justify-between mb-3">
                <div>{estrellas(r.estrellas)}</div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "#E8D5CA", color: "#9C8275" }}
                >
                  {r.iniciales}
                </div>
              </div>

              {/* Texto */}
              <p className="text-sm text-[#6B5B4E] leading-relaxed mb-4 flex-1">
                {r.texto}
              </p>

              {/* Producto */}
              <p className="text-xs text-[#D4A574] mb-4 italic">{r.producto}</p>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E8D5CA]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "#D4A574", color: "#FAF8F5" }}
                >
                  {r.iniciales}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6B5B4E]">{r.nombre}</p>
                  <p className="text-xs text-[#9C8275]">{r.rol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resenias;

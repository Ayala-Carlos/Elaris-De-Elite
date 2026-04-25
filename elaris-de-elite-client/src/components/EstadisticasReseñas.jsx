import React from "react";

const EstadisticasReseñas = ({ stats }) => {
  return (
    <section className="px-6 md:px-16 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl text-center py-5 px-4"
            style={{ backgroundColor: "#F0E8E0" }}
          >
            <p
              className="text-2xl font-bold mb-1"
              style={{
                color: s.color
              }}
            >
              {s.valor}
            </p>

            <p className="text-xs text-[#9C8275] tracking-wide">
              {s.etiqueta}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EstadisticasReseñas;
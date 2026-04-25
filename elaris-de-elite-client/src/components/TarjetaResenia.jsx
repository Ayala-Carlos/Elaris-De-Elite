import React from "react";

const estrellas = (n = 5) =>
  Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      style={{ color: i < n ? "#D4A574" : "#e0d0c4", fontSize: "16px" }}
    >
      ★
    </span>
  ));

const TarjetaResenia = ({ data }) => {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between"
      style={{
        backgroundColor: "#F5EDE6",
        border: "1px solid #E8D5CA",
      }}
    >
      {/* Estrellas + ícono */}
      <div className="flex items-center justify-between mb-3">
        <div>{estrellas(data.estrellas)}</div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: "#E8D5CA", color: "#9C8275" }}
        >
          {data.iniciales}
        </div>
      </div>

      {/* Texto */}
      <p className="text-sm text-[#6B5B4E] leading-relaxed mb-4 flex-1">
        {data.texto}
      </p>

      {/* Producto */}
      <p className="text-xs text-[#D4A574] mb-4 italic">
        {data.producto}
      </p>

      {/* Autor */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#E8D5CA]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: "#D4A574", color: "#FAF8F5" }}
        >
          {data.iniciales}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#6B5B4E]">
            {data.nombre}
          </p>
          <p className="text-xs text-[#9C8275]">{data.rol}</p>
        </div>
      </div>
    </div>
  );
};

export default TarjetaResenia;
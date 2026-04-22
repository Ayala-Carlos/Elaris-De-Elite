import React from "react";

const TarjetaNovedad = ({ novedad }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E8D5CA] overflow-hidden hover:shadow-md transition">

      <img
        src={novedad.img}
        alt={novedad.titulo}
        className="w-full h-36 object-cover"
      />

      <div className="p-4">
        <span className="bg-[#E89B9B] text-white text-xs px-2 py-1 rounded-full">
          {novedad.categoria}
        </span>

        <h3 className="text-sm font-semibold text-[#6B5B4E] mt-2 mb-2">
          {novedad.titulo}
        </h3>

        <p className="text-xs text-gray-500 mb-3">
          {novedad.descripcion}
        </p>

        <p className="text-xs text-[#D4A574]">
          {novedad.fecha}
        </p>
      </div>
    </div>
  );
};

export default TarjetaNovedad;
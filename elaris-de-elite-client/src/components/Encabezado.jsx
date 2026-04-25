import React from "react";

const Encabezado = ({ textoSuperior, titulo, textoInferior }) => {
  return (
    <>
      <div className="text-center mb-12 mt-2 px-4">
        <p className="text-[#D4A574] text-sm mb-2">{textoSuperior}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6B5B4E] mb-3">
          {titulo}
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          {textoInferior}
        </p>
      </div>
    </>
  );
};

export default Encabezado;

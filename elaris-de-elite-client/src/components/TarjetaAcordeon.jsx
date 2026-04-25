import React from "react";

const TarjetaAcordeon = ({ data, abierto, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E8D5CA] overflow-hidden">
      
      {/* Cabecera */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#FAF8F5] transition-colors"
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${data.iconBg}`}
        >
          {data.icon}
        </div>

        <span className="font-semibold text-[#6B5B4E] text-sm flex-1">
          {data.titulo}
        </span>

        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            abierto ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Contenido */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          abierto ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-500 leading-relaxed px-5 pb-5">
          {data.texto}
        </p>
      </div>
    </div>
  );
};

export default TarjetaAcordeon;
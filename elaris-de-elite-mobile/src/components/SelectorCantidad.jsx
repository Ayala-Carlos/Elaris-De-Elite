import React from 'react';

const SelectorCantidad = ({ cantidad, setCantidad }) => {
  const incrementar = () => setCantidad(cantidad + 1);
  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="flex items-center gap-3 bg-[#F9F9F9] p-2 rounded-full w-fit">
      <button 
        onClick={decrementar}
        className="text-gray-500 font-bold px-2 hover:text-[#D4A373] active:scale-95"
      >
        -
      </button>
      <span className="font-semibold text-sm w-4 text-center">{cantidad}</span>
      <button 
        onClick={incrementar}
        className="text-gray-500 font-bold px-2 hover:text-[#D4A373] active:scale-95"
      >
        +
      </button>
    </div>
  );
};

export default SelectorCantidad;
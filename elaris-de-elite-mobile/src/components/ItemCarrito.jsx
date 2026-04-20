import React, { useState } from 'react';
import SelectorCantidad from './SelectorCantidad';
import { TrashIcon } from '@heroicons/react/24/outline'; // Asegúrate de instalar heroicons

const ItemCarrito = ({ item, onEliminar }) => {
  // Manejamos la cantidad localmente para este ejemplo
  const [cantidad, setCantidad] = useState(item.cantidad);

  return (
    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        {/* Contenedor de la Imagen */}
        <div className="bg-[#F9F9F9] rounded-xl p-3 aspect-square flex items-center justify-center w-24">
          <img src={item.imagen} alt={item.nombre} className="object-contain h-full" />
        </div>
        
        {/* Detalles del Producto */}
        <div className="space-y-1">
          <h3 className="font-bold text-base text-[#D4A373]">{item.marca}</h3>
          <p className="text-sm text-gray-600 leading-snug">{item.nombre}</p>
          <p className="text-xs text-gray-500">{item.especificacion}</p>
        </div>
      </div>

      {/* Selector de Cantidad, Precio y Eliminar */}
      <div className="flex flex-col items-end gap-3">
        <SelectorCantidad cantidad={cantidad} setCantidad={setCantidad} />
        <p className="font-semibold text-lg text-gray-800">${(item.precio * cantidad).toFixed(2)}</p>
        <button 
          onClick={() => onEliminar(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ItemCarrito;
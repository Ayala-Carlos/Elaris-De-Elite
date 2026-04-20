import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export const TarjetaProducto = ({ marca, nombre, precio, imagen, colores }) => (
  <div className="relative mb-10">
    {/* El cuadro gris de la imagen (flotando) */}
    <div className="bg-[#F3EEE7] rounded-xl p-3 aspect-square flex items-center justify-center relative z-10 -mb-10 mx-2">
      <img src={imagen} alt={nombre} className="h-3/4 object-contain" />
    </div>
    
    {/* La tarjeta blanca de info */}
    <div className="bg-white rounded-2xl p-4 pt-12 shadow-sm border border-gray-100">
      <h4 className="font-extrabold text-sm text-gray-900 leading-tight">{marca}</h4>
      <p className="text-[10px] text-gray-500 line-clamp-2 h-6 mt-1">{nombre}</p>
      
      {/* Círculos de colores */}
      <div className="flex gap-1 my-2">
        {colores.map((color, i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-full border border-gray-100" style={{ backgroundColor: color }} />
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-sm text-gray-950">${precio}</span>
        <button className="bg-[#F8F1ED] p-1.5 rounded-lg text-[#D4A373]">
          <ShoppingCartIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);
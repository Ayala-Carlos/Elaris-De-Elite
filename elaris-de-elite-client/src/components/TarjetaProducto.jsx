import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const TarjetaProducto = ({ producto }) => {
  return (
    <Link to={`/producto/${producto.id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5CA] overflow-hidden hover:shadow-md transition cursor-pointer">

        <img
          src={producto.img}
          alt={producto.nombre}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <p className="text-xs text-[#D4A574] font-semibold mb-1">
            {producto.categoria}
          </p>

          <h3 className="text-sm font-semibold text-[#6B5B4E] mb-2">
            {producto.nombre}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#6B5B4E]">
              ${producto.precio}
            </p>

            {/* BOTÓN CARRITO */}
            <button
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F2E7E1] p-2 rounded-full hover:bg-[#D4A574] hover:text-white transition"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default TarjetaProducto;
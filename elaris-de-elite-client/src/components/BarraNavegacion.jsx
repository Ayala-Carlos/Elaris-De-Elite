import React from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import logoElaris from "../img/elaris-logo.png";

const BarraNavegacion = () => {
  return (
    <nav className="w-full bg-[#FAF8F5] shadow-sm px-10 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <img src={logoElaris} alt="logo" className="w-14 h-14 md:w-16 md:h-16 object-contain" />

      {/* Links */}
      <ul className="flex gap-10 text-[#6B5B4E] font-medium">
        <li className="hover:text-[#D4A574] cursor-pointer">Inicio</li>
        <li className="hover:text-[#D4A574] cursor-pointer">Productos</li>
        <li className="hover:text-[#D4A574] cursor-pointer">Novedades</li>
        <li className="hover:text-[#D4A574] cursor-pointer">Nosotros</li>
        <li className="hover:text-[#D4A574] cursor-pointer">Reseñas</li>
      </ul>

      {/* Icons */}
      <div className="flex gap-5 text-[#6B5B4E]">
        <Search className="cursor-pointer hover:text-[#D4A574]" />
        <User className="cursor-pointer hover:text-[#D4A574]" />
        <ShoppingBag className="cursor-pointer hover:text-[#D4A574]" />
      </div>
    </nav>
  );
};

export default BarraNavegacion;
import React from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import logoElarisNav from "../img/LogoElarisEliteNav.png";
import { Link } from "react-router-dom"

const BarraNavegacion = () => {
  return (
    <nav className="w-full bg-[#FAF8F5] shadow-sm px-5 py-1 flex items-center justify-between">
      
      {/* Logo */}
      <img
        src={logoElarisNav}
        alt="logo"
        className="w-18 h-18 md:w-20 md:h-20 object-contain -my-2"
      />

      {/* Links */}
      <ul className="flex gap-8 text-[#6B5B4E] font-medium">
        <li>
          <Link to="/bienvenida" className="hover:text-[#D4A574] cursor-pointer"> Inicio</Link>
        </li>
        <li>
          <Link to="/productos" className="hover:text-[#D4A574] cursor-pointer"> Productos</Link>
        </li>
        <li>
          <Link to="/novedades" className="hover:text-[#D4A574] cursor-pointer"> Novedades</Link>
        </li>
        <li>
          <Link to="/nosotros" className="hover:text-[#D4A574] cursor-pointer"> Nosotros</Link>
        </li>
        <li>
          <Link to="/reseñas" className="hover:text-[#D4A574] cursor-pointer"> Reseñas</Link>
        </li>

      </ul>

      {/* Icons */}
      <div className="flex gap-6 text-[#6B5B4E]">
        <Link to="/buscar">
          <Search size={18} className="cursor-pointer hover:text-[#D4A574]" />
        </Link>
        <Link to="/perfilusuario">
          <User size={18} className="cursor-pointer hover:text-[#D4A574]" />
        </Link>
        <Link to="/carrito">
          <ShoppingBag size={18} className="cursor-pointer hover:text-[#D4A574]" />
        </Link>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
import React, { useState } from "react";
import { User, ShoppingBag, Menu, X } from "lucide-react";
import logoElarisNav from "../img/LogoElarisEliteNav.png";
import { Link } from "react-router-dom";

const BarraNavegacion = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FAF8F5] shadow-sm px-4 md:px-8 py-2">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <img
          src={logoElarisNav}
          alt="logo"
          className="w-14 h-14 md:w-20 md:h-20 object-contain"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-[#6B5B4E] font-medium">
          <li><Link to="/bienvenida" className="hover:text-[#D4A574]">Inicio</Link></li>
          <li><Link to="/productos" className="hover:text-[#D4A574]">Productos</Link></li>
          <li><Link to="/novedades" className="hover:text-[#D4A574]">Novedades</Link></li>
          <li><Link to="/nosotros" className="hover:text-[#D4A574]">Nosotros</Link></li>
          <li><Link to="/reseñas" className="hover:text-[#D4A574]">Reseñas</Link></li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex gap-6 text-[#6B5B4E]">
          <Link to="/perfilusuario"><User className="hover:text-[#D4A574]" /></Link>
          <Link to="/carrito"><ShoppingBag className="hover:text-[#D4A574]" /></Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center text-[#6B5B4E]">
          <Link to="/bienvenida">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/novedades">Novedades</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/reseñas">Reseñas</Link>

          <div className="flex justify-center gap-6 pt-2">
            <Link to="/perfilusuario"><User /></Link>
            <Link to="/carrito"><ShoppingBag /></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default BarraNavegacion;
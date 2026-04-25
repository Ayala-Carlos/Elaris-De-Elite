import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#E8949B] px-4 md:px-10 py-12 mt-10">

      <div className="max-w-7xl mx-auto 
        grid gap-8 md:gap-16 
        sm:grid-cols-1 
        md:grid-cols-3 
        lg:grid-cols-[1fr_1.5fr_1fr] 
        items-start text-center md:text-left">

        {/* Links */}
        <div className="lg:pr-6">
          <h3 className="font-bold mb-4 text-[#7a2530]">Enlaces rápidos</h3>
          <ul className="space-y-2 text-sm text-white">
            <li><Link to="/bienvenida" className="hover:text-[#7a2530]">Inicio</Link></li>
            <li><Link to="/productos" className="hover:text-[#7a2530]">Productos</Link></li>
            <li><Link to="/nosotros" className="hover:text-[#7a2530]">Nosotros</Link></li>
            <li><Link to="/contactanos" className="hover:text-[#7a2530]">Contáctanos</Link></li>
            <li><Link to="/terminosycondiciones" className="hover:text-[#7a2530]">Términos</Link></li>
          </ul>
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center text-center px-4 mb-6 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-[#DE4B52] tracking-widest font-serif">
            ÉLARIS DE ÉLITE
          </h1>

          <div className="w-1/2 h-[1px] bg-[#DE4B52] my-4"></div>

          <div className="flex gap-6 text-[#7a2530] text-lg">
            <FaXTwitter className="hover:text-white cursor-pointer" />
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Contact */}
        <div className="lg:pl-6 max-w-xs mx-auto md:mx-0 lg:ml-auto">
          <h3 className="font-bold mb-4 text-[#7a2530]">Contáctenos</h3>

          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin size={14} className="text-[#7a2530]" />
              <span>Antiguo Cuscatlán, La Libertad</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone size={14} className="text-[#7a2530]" />
              <span>(+503) 6035-6077</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone size={14} className="text-[#7a2530]" />
              <span>(+503) 7119-1709</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail size={14} className="text-[#7a2530]" />
              <span>elarisdeelite@gmail.com</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
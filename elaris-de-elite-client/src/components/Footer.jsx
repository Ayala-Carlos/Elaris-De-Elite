import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-[#E8949B] px-6 py-6 mt-10">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Links */}
                <div className="ml-6">
                    <h3 className="font-bold mb-4 text-[#7a2530] text-1xl">Enlaces rápidos</h3>
                    <ul className="space-y-2 text-sm text-white">
                        {/* Referencias a otras páginas con enlaces */}
                        <li>
                            <Link to="/bienvenida" className="cursor-pointer hover:text-[#7a2530] transition-colors">Inicio</Link>
                        </li>                      
                        <li>
                            <Link to="/productos" className="cursor-pointer hover:text-[#7a2530] transition-colors">Productos</Link>
                        </li>
                        <li>
                            <Link to="/nosotros" className="cursor-pointer hover:text-[#7a2530] transition-colors">Nosotros</Link>
                        </li>
                        <li>
                            <Link to="/contactanos" className="cursor-pointer hover:text-[#7a2530] transition-colors">Contáctanos</Link>
                        </li>
                    </ul>
                </div>

                {/* Brand */}
                <div className="flex flex-col items-center mr-4">
                    <h1 className="text-3xl font-bold text-[#DE4B52] mb-1 mt-4 tracking-widest font-serif">
                        ÉLARIS DE ÉLITE
                    </h1>
                    <div className="w-2/3 mx-auto h-[1px] bg-[#DE4B52] mb-4"></div>
                    <div className="flex gap-10 text-[#7a2530] text-lg">
                        <FaXTwitter className="cursor-pointer hover:text-white transition-colors" />
                        <FaFacebookF className="cursor-pointer hover:text-white transition-colors" />
                        <FaInstagram className="cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                {/* Contact con íconos */}
                <div className="ml-70">
                    <h3 className="font-bold mb-4 text-[#7a2530] text-1xl">Contáctenos</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                            <MapPin size={14} className="text-[#7a2530] shrink-0" />
                            <span>La Libertad, Antiguo Cuscatlán</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Phone size={14} className="text-[#7a2530] shrink-0" />
                            <span>(+503) 6035-6077</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Phone size={14} className="text-[#7a2530] shrink-0" />
                            <span>(+503) 7119-1709</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Mail size={14} className="text-[#7a2530] shrink-0" />
                            <span>elarisdeelite@gmail.com</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
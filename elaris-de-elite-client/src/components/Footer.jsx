import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-[#E89B9B] text-white px-10 py-10 mt-20">
            <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">

                {/* Links */}
                <div>
                    <h3 className="font-bold mb-4">Enlaces rápidos</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Inicio</li>
                        <li>Productos</li>
                        <li>Colecciones</li>
                        <li>Nosotros</li>
                        <li>Contáctenos</li>
                    </ul>
                </div>

                {/* Brand */}
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-3">ÉLARIS DE ÉLITE</h2>
                    <div className="flex gap-4">
                        <FaXTwitter />
                        <FaFacebookF />
                        <FaInstagram />
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold mb-4">Contáctenos</h3>
                    <p className="text-sm">La Libertad, Antiguo Cuscatlán</p>
                    <p className="text-sm">+503 6035-6077</p>
                    <p className="text-sm">+503 7119-1709</p>
                    <p className="text-sm">elarisdeelite@gmail.com</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
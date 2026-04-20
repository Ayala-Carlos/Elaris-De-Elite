import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.jpg';
import Boton from '../components/Boton.jsx'; 
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';

const Registro = () => {
  const navigate = useNavigate();

  const manejarRegistro = (e) => {
    e.preventDefault();
    navigate('/Inicio');
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#FAF4ED] px-8 pt-10 pb-10 font-base text-[#5B4D42]">
      <div className="absolute top-4 right-4 z-50">
        <MenuHamburguesa />
      </div>

      {/* Logo pequeño */}
      <img src={logo} alt="Logo" className="w-24 h-24 object-contain mb-4" />

      <h2 className="text-2xl font-bold mb-1 text-[#4A3F36]">Registrarse</h2>
      <p className="text-[#7B6D61] mb-8 text-center text-sm">Crea tu cuenta para continuar</p>

      {/* Formulario */}
      <form className="w-full max-w-sm space-y-4" onSubmit={manejarRegistro}>
        
        {/* Nombre Completo */}
        <div>
          <label className="block font-bold mb-1 ml-1 text-[#4A3F36]">Nombre completo</label>
          <input type="text" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
        </div>

        {/* Correo */}
        <div>
          <label className="block font-bold mb-1 ml-1 text-[#4A3F36]">Correo electrónico</label>
          <input type="email" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
        </div>

        {/* Fila doble: Contraseña y Teléfono */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 ml-1 text-sm text-[#4A3F36]">Contraseña</label>
            <input type="password" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
          </div>
          <div>
            <label className="block font-bold mb-1 ml-1 text-sm text-[#4A3F36]">N. teléfono</label>
            <input type="tel" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
          </div>
        </div>

        {/* Fila doble: País y Estado */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 ml-1 text-sm text-[#4A3F36]">País</label>
            <input type="text" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
          </div>
          <div>
            <label className="block font-bold mb-1 ml-1 text-sm text-[#4A3F36]">Estado</label>
            <input type="text" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
          </div>
        </div>

        {/* Ciudad */}
        <div>
          <label className="block font-bold mb-1 ml-1 text-[#4A3F36]">Ciudad</label>
          <input type="text" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
        </div>

        {/* Dirección */}
        <div>
          <label className="block font-bold mb-1 ml-1 text-sm text-[#4A3F36]">Dirección</label>
          <input type="text" className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4A373]" />
        </div>

        {/* Botón Registrarse */}
        <div className="pt-4">
          <Boton tipo="primario" anchoTotal>
            Registrarse
          </Boton>
        </div>
      </form>

      {/* Volver */}
      <button
        type="button"
        onClick={() => navigate('/Bienvenida')}
        className="mt-6 text-[#7B6D61] text-sm flex items-center gap-2 hover:text-[#4A3F36]"
      >
        <span>←</span> Volver al inicio
      </button>
    </div>
  );
};

export default Registro;
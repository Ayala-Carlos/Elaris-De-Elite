import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.jpg';
import Boton from '../components/Boton.jsx'
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';

const IniciarSesion = () => {
  const navigate = useNavigate();

  const manejarInicioSesion = (e) => {
    e.preventDefault();
    navigate('/Inicio');
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#FAF4ED] px-8 pt-12">
      <div className="absolute top-4 right-4 z-50">
        <MenuHamburguesa />
      </div>

      {/* Logo pequeño arriba */}
      <img src={logo} alt="Logo" className="w-24 h-24 object-contain mb-6" />

      <h2 className="text-2xl font-bold text-[#4A3F36] mb-2">Iniciar sesión</h2>
      <p className="text-[#7B6D61] mb-10 text-center">Accede a tu cuenta para continuar</p>

      {/* Formulario */}
      <form className="w-full max-w-sm space-y-6" onSubmit={manejarInicioSesion}>
        <div>
          <label className="block text-[#4A3F36] font-bold mb-2 ml-1">Correo electrónico</label>
          <input 
            type="email" 
            className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-4 focus:ring-2 focus:ring-[#D4A373] outline-none"
          />
        </div>

        <div>
          <label className="block text-[#4A3F36] font-bold mb-2 ml-1">Contraseña</label>
          <input 
            type="password" 
            className="w-full bg-white border border-[#D8C8B7] text-[#4A3F36] placeholder:text-[#A89889] rounded-xl p-4 focus:ring-2 focus:ring-[#D4A373] outline-none"
          />
        </div>

        {/* Checkbox y Link */}
        <div className="flex flex-col space-y-4">
          <label className="flex items-center space-x-2 text-sm text-[#5B4D42] cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#D4A373] rounded" />
            <span>Recordarme</span>
          </label>
          
          <a href="#" className="text-sm font-bold text-[#4A3F36] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón Principal */}
        <div className="pt-4">
          <Boton tipo="primario" anchoTotal>
            Iniciar Sesión
          </Boton>
        </div>
      </form>

      {/* Volver atrás */}
      <button
        type="button"
        onClick={() => navigate('/Bienvenida')}
        className="mt-8 text-[#7B6D61] flex items-center gap-2 hover:text-[#4A3F36]"
      >
        <span>←</span> Volver al inicio
      </button>
    </div>
  );
};

export default IniciarSesion;
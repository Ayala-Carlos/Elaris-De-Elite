import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.jpg';
import Boton from '../components/Boton.jsx'; // Importamos tu componente
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';

const Bienvenida = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#FAF4ED] px-6 pt-10 pb-8 flex flex-col">
      <div className="absolute top-4 right-4 z-50">
        <MenuHamburguesa />
      </div>

      <h1 className="text-[44px] leading-none font-bold text-[#6B5D50] mb-10 text-left max-w-[340px]">
        Bienvenido a tu belleza
      </h1>

      <div className="flex justify-center mb-20">
        <img
          src={logo}
          alt="Elaris de Elite Logo"
          className="w-[330px] h-[330px] object-contain"
        />
      </div>

      <div className="w-full max-w-[430px] mx-auto space-y-7 mt-auto">
        <Boton tipo="secundario" anchoTotal onClick={() => navigate('/Registro')}>
          Registrarse
        </Boton>
        
        <Boton tipo="secundario" anchoTotal onClick={() => navigate('/Login')}>
          Inicia sesión
        </Boton>
      </div>
    </div>
  );
};

export default Bienvenida;
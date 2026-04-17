import React from 'react';
import Boton from '../components/Boton.jsx'; // Importamos tu componente

const Bienvenida = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-8">
      
      <h1 className="text-2xl font-bold text-[#5B4D42] mb-12 text-center">
        Bienvenido a tu belleza
      </h1>

      
      <div className="mb-16">
        <img 
          src="/logo-grande.png" 
          alt="Elaris de Elite Logo" 
          className="w-48 h-48 object-contain"
        />
      </div>

      
      <div className="w-full space-y-4 max-w-xs">
        <Boton tipo="secundario" anchoTotal onClick={() => console.log('Ir a Registro')}>
          Registrarse
        </Boton>
        
        <Boton tipo="secundario" anchoTotal onClick={() => console.log('Ir a Login')}>
          Inicia sesión
        </Boton>
      </div>
    </div>
  );
};

export default Bienvenida;
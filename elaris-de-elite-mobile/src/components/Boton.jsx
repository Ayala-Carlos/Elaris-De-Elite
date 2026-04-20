import React from 'react';

// Definimos las variantes de color según tus bocetos
const variantesEstilo = {
  // El botón café/dorado de "Iniciar Sesión" o "Proceder al pago"
  primario: "bg-[#C98F5F] text-white hover:bg-[#B67E4D] active:scale-95 shadow-sm",
  
  // El botón crema de "Registrarse" o "Aplicar"
  secundario: "bg-[#E9D7C7] text-[#5B4D42] hover:bg-[#DFC6B1] active:scale-95 shadow-sm",
  
  // El botón con borde de "Continuar comprando" o "Cerrar sesión"
  outline: "border-2 border-[#A67446] text-[#A67446] bg-transparent hover:bg-[#F4E7DB] active:scale-95",
};

const Boton = ({ 
  children,       
  tipo = "primario",
  anchoTotal = false, 
  onClick,        
  className = ""  
}) => {
  
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        py-4 px-6 
        rounded-2xl 
        font-bold 
        transition-all 
        duration-200
        ${variantesEstilo[tipo]} 
        ${anchoTotal ? 'w-full' : 'w-auto'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Boton;
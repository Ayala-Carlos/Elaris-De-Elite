import React from 'react';

// Definimos las variantes de color según tus bocetos
const variantesEstilo = {
  // El botón café/dorado de "Iniciar Sesión" o "Proceder al pago"
  primario: "bg-[#D4A373] text-white hover:bg-[#C29263] active:scale-95",
  
  // El botón crema de "Registrarse" o "Aplicar"
  secundario: "bg-[#F8F1ED] text-[#5B4D42] hover:bg-[#F2E7E1] active:scale-95",
  
  // El botón con borde de "Continuar comprando" o "Cerrar sesión"
  outline: "border-2 border-[#D4A373] text-[#D4A373] bg-transparent hover:bg-[#F8F1ED] active:scale-95",
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
        py-3 px-6 
        rounded-xl 
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../img/elaris-logo.png";

export default function TopNavbar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // limpiar localStorage o tokens
    console.log("Sesión cerrada");
    navigate("/login");
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-[#f5f0eb]">
        {/* Contenedor del Logo */}
        <div className="w-10 h-10 rounded-full border-2 border-[#c8a87a] flex items-center justify-center overflow-hidden bg-white">
          <img 
            src={logoImg} 
            alt="Logo Elite" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="text-[#c8a87a] text-xs font-bold uppercase hidden">ÉE</span>
        </div>

        {/* Botón de Salir */}
        <button 
          className="text-[#c8a87a] text-2xl hover:scale-110 transition-transform duration-200"
          onClick={() => setShowModal(true)} // Abrimos el modal
        >
          ⇥
        </button>
      </div>

      {/* MODAL DE CERRAR SESIÓN */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-[#ede8e0] transform transition-all">
            <div className="text-center">
              {/* Icono de advertencia suave */}
              <div className="w-16 h-16 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              
              <h3 className="text-xl font-bold text-[#3b2a2a] mb-2">¿Cerrar sesión?</h3>
              <p className="text-[#7a6a6a] text-sm mb-8">
                Estás a punto de salir del panel de administración. ¿Deseas continuar?
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#ede8e0] text-[#7a6a6a] font-semibold hover:bg-[#f5f0eb] transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#c8a87a] text-white font-semibold hover:bg-[#b8986a] transition-colors shadow-sm"
                >
                  Sí, salir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
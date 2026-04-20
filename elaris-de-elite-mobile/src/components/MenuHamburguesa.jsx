import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const MenuHamburguesa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [abierto, setAbierto] = useState(false);
  const [productosAbierto, setProductosAbierto] = useState(true);

  useEffect(() => {
    setAbierto(false);
  }, [location.pathname]);

  const ir = (ruta) => {
    setAbierto(false);
    navigate(ruta);
  };

  return (
    <>
      <button onClick={() => setAbierto(true)} aria-label="Abrir menu">
        <Bars3Icon className="h-5 w-5 text-gray-400" />
      </button>

      {abierto && (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/10"
          onClick={() => setAbierto(false)}
          aria-label="Cerrar menu"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[72%] max-w-[320px] bg-[#F2ECE7] shadow-[-10px_0_30px_rgba(0,0,0,0.08)] rounded-l-3xl px-6 pt-8 pb-6 transition-transform duration-300 ${abierto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[#4A3F36] text-3xl font-bold leading-none">Menu</p>
          </div>
          <button onClick={() => setAbierto(false)} aria-label="Cerrar menu">
            <XMarkIcon className="h-6 w-6 text-[#6B5D50]" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-right text-[#6B5D50]">
          <button onClick={() => ir('/Inicio')} className="text-2xl">Inicio</button>
          <button onClick={() => ir('/Perfil')} className="text-2xl">Mi perfil</button>

          <div className="flex flex-col items-end">
            <button
              onClick={() => setProductosAbierto((actual) => !actual)}
              className="text-2xl flex items-center gap-1"
            >
              Productos
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${productosAbierto ? 'rotate-180' : ''}`} />
            </button>

            {productosAbierto && (
              <div className="mt-2 flex flex-col items-end gap-1 text-base text-[#7E7065]">
                <button onClick={() => ir('/categoria/rubor')}>rubores</button>
                <button onClick={() => ir('/categoria/base')}>Bases</button>
                <button onClick={() => ir('/categoria/correctores')}>Correctores</button>
                <button onClick={() => ir('/categoria/iluminadores')}>Iluminadores</button>
              </div>
            )}
          </div>

          <button onClick={() => ir('/carrito')} className="text-2xl">Carrito de compras</button>
          <button onClick={() => ir('/terminos-y-condiciones')} className="text-2xl">Terminos y condiciones</button>
          <button onClick={() => ir('/Bienvenida')} className="text-base mt-8 text-[#7E7065] flex items-center justify-end gap-2">
            Cerrar sesión
          </button>
        </nav>
      </aside>
    </>
  );
};

export default MenuHamburguesa;

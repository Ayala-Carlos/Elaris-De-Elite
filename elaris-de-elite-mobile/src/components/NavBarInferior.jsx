import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCartIcon,
  SparklesIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const NavbarInferior = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/Inicio';
  const isCatalog = location.pathname.startsWith('/categoria/') || location.pathname.startsWith('/producto/');
  const isCart = location.pathname === '/carrito';
  const isPedidos = location.pathname === '/Pedidos';
  const isPerfil = location.pathname === '/Perfil';

  const navButtonClass = (active) => `flex flex-col items-center justify-center gap-1 min-w-0 px-2 py-1 rounded-2xl transition-colors ${active ? 'bg-[#F8E9EA]' : ''}`;
  const iconClass = (active) => `h-7 w-7 ${active ? 'text-[#E49D9D]' : 'text-gray-300'}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-4 py-4 border-t border-gray-100 flex justify-around items-center z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
      <button onClick={() => navigate('/carrito')} className={navButtonClass(isCart)} aria-label="Carrito">
        <ShoppingCartIcon className={iconClass(isCart)} />
      </button>

      <button onClick={() => navigate('/categoria/rubor')} className={navButtonClass(isCatalog)} aria-label="Productos">
        <SparklesIcon className={iconClass(isCatalog)} />
      </button>

      <button
        onClick={() => navigate('/Inicio')}
        className={navButtonClass(isHome)}
        aria-label="Inicio"
      >
        <HomeIcon className={iconClass(isHome)} />
      </button>

      <button onClick={() => navigate('/Pedidos')} className={navButtonClass(isPedidos)} aria-label="Pedidos">
        <ClipboardDocumentListIcon className={iconClass(isPedidos)} />
      </button>

      <button onClick={() => navigate('/Perfil')} className={navButtonClass(isPerfil)} aria-label="Perfil">
        <UserIcon className={iconClass(isPerfil)} />
      </button>
    </nav>
  );
};

export default NavbarInferior;

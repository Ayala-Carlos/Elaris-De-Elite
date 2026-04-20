import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.jpg';
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';
import NavbarInferior from '../components/NavBarInferior.jsx';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const TerminosCondiciones = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF4ED] min-h-screen pb-24">
      <header className="bg-[#FAF4ED] px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#F0E6D8]">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Elaris de Elite"
            className="h-10 w-10 rounded-full object-cover border border-[#E4C28B] bg-[#F9F0EE]"
          />
          <span className="font-semibold text-[13px] text-[#E06270] tracking-wide" style={{ fontFamily: "'Cinzel', 'Times New Roman', serif" }}>
            ELARIS DE ELITE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/carrito')} aria-label="Abrir carrito">
            <ShoppingCartIcon className="h-4.5 w-4.5 text-gray-400" />
          </button>
          <MenuHamburguesa />
        </div>
      </header>

      <main className="px-4 pt-4 pb-8">
        <button onClick={() => navigate('/Inicio')} className="text-[#E49D9D] text-xs font-semibold mb-4">
          ← volver a inicio
        </button>
        <h1 className="text-[32px] font-bold text-[#6B5D50] mb-6 text-center leading-none">Terminos y condiciones</h1>

        <div className="bg-[#F8E7E8] rounded-[1.5rem] shadow-[0_14px_28px_rgba(0,0,0,0.08)] border border-[#F0D6D8] min-h-[560px] px-6 py-14 flex flex-col items-center justify-center text-center">
          <p className="text-[21px] leading-[1.1] text-[#7C6A5E] max-w-[300px]">
            Al acceder a esta aplicación, aceptas cumplir con sus reglas y regulaciones.
            Todo el contenido y material intelectual pertenecen a Eláris de Elite o a sus licenciatentes, y su uso está limitado a fines personales bajo las restricciones establecidas.
            Respecto a la logística, los tiempos de envío dependen de tu ubicación y se permiten devoluciones dentro de los 30 días posteriores a la recepción, siempre que los productos estén en su estado original y sin usar.
          </p>

          <a
            href="#" //poner despues el terminos y condiciones de la web :D
            target="_blank"
            rel="noreferrer"
            className="text-[16px] text-[#9A8A7C] mt-14 max-w-[260px] leading-snug underline underline-offset-4"
          >
            Saber mas acerca de nuestros terminos y condiciones
          </a>
        </div>
      </main>

      <NavbarInferior />
    </div>
  );
};

export default TerminosCondiciones;

import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NavbarInferior from '../components/NavBarInferior.jsx';
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';
import {
  ShoppingCartIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

const HeaderPrincipal = () => (
  <header className="bg-[#FAF4ED] px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#F0E6D8]">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 border border-[#E7C4B2] rounded-full flex items-center justify-center font-bold text-[#E3A88E] text-[9px]">EE</div>
      <span className="font-semibold text-[11px] text-[#DE8F8F] tracking-tight">ELARIS DE ELITE</span>
    </div>
    <div className="flex items-center gap-2">
      <button onClick={() => navigate('/carrito')} aria-label="Abrir carrito">
        <ShoppingCartIcon className="h-4.5 w-4.5 text-gray-400" />
      </button>
      <MenuHamburguesa />
    </div>
  </header>
);

const DetalleProducto = () => {
  const { productoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cantidad, setCantidad] = useState(1);

  const catalogoLocal = [
    {
      id: 'rare-beauty-soft-pinch',
      marca: 'Rare Beauty',
      nombre: 'Soft Pinch Luminous Powder Blush',
      descripcion: 'Rubor luminoso que se difumina facil y deja efecto natural.',
      imagen: 'https://www.rarebeauty.com/cdn/shop/products/SoftPinchLuminousPowderBlush_Joy_1_800x.jpg',
      precio: 27,
      colores: ['#D2647A', '#C14B68', '#B73E5E', '#9E344F', '#863043', '#C6644F', '#DA483A']
    },
    {
      id: 'patrick-ta-double-take',
      marca: 'Patrick Ta',
      nombre: 'Double-Take Creme and Powder Blush Duo',
      descripcion: 'Duo de blush para construir color y sellar con larga duracion.',
      imagen: 'https://patrickta.com/cdn/shop/products/DoubleTakeBlush_ShesThatGirl_1_800x.jpg',
      precio: 40,
      colores: ['#D2675C', '#B9524B', '#A13D3B', '#8B3B2C', '#754028', '#8A2F2A', '#C13E35']
    },
    {
      id: 'dior-backstage-foundation',
      marca: 'Dior',
      nombre: 'Backstage Face and Body Foundation',
      descripcion: 'Base ligera para piel uniforme, cobertura modulable y acabado natural.',
      imagen: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
      precio: 45,
      colores: ['#F3E1CF', '#E6C7A8', '#D9AD81', '#CC935A', '#B77A45']
    },
    {
      id: 'prada-soft-matte-foundation',
      marca: 'Prada',
      nombre: 'Optimizing Refillable Soft Matte Foundation',
      descripcion: 'Acabado soft matte con textura comoda para uso diario.',
      imagen: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      precio: 70,
      colores: ['#F7E6D5', '#EFD2B8', '#E7BE9B', '#DFAA7E', '#D79661']
    }
  ];

  const productoEncontrado = useMemo(() => {
    if (location.state?.producto) {
      return {
        ...location.state.producto,
        descripcion: 'Producto premium de larga duracion para un acabado profesional.'
      };
    }

    return catalogoLocal.find((item) => item.id === productoId) || catalogoLocal[0];
  }, [location.state, productoId]);

  const [colorSeleccionado, setColorSeleccionado] = useState(productoEncontrado.colores[0]);

  return (
    <div className="bg-[#FAF4ED] min-h-screen pb-24">
      <HeaderPrincipal />

      <main className="px-4 pt-4 pb-8">
        <button onClick={() => navigate('/Inicio')} className="text-[#E49D9D] text-xs font-semibold mb-4">
          ← volver a inicio
        </button>

        <section className="bg-[#F3F3F3] rounded-sm h-[265px] flex items-center justify-center relative mb-4">
          <button className="absolute left-3 text-gray-400">
            <ArrowLeftIcon className="h-8 w-8" />
          </button>
          <img src={productoEncontrado.imagen} alt={productoEncontrado.nombre} className="h-44 object-contain" />
          <button className="absolute right-3 text-gray-400">
            <ArrowRightIcon className="h-8 w-8" />
          </button>
        </section>

        <section>
          <h1 className="text-[39px] font-bold leading-none text-[#1D1715]">{productoEncontrado.marca}</h1>
          <p className="text-[18px] text-[#6F655D] leading-tight mt-1.5 max-w-[330px]">{productoEncontrado.nombre}</p>
          <p className="text-sm text-[#807468] mt-1.5">{productoEncontrado.descripcion}</p>

          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {productoEncontrado.colores.map((color) => (
              <button
                key={color}
                onClick={() => setColorSeleccionado(color)}
                className={`w-7 h-7 rounded-full border-2 ${colorSeleccionado === color ? 'border-[#6F655D]' : 'border-transparent'}`}
              >
                <span className="block w-full h-full rounded-full" style={{ backgroundColor: color }} />
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[#6B5B4D] text-[36px] font-medium">${productoEncontrado.precio.toFixed(2)}</p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCantidad((actual) => Math.max(1, actual - 1))}
                className="text-[#6F655D]"
              >
                <MinusCircleIcon className="h-7 w-7" />
              </button>
              <span className="text-2xl text-[#6F655D] leading-none">{cantidad}</span>
              <button onClick={() => setCantidad((actual) => actual + 1)} className="text-[#6F655D]">
                <PlusCircleIcon className="h-7 w-7" />
              </button>
              <button className="bg-[#F9EDEE] p-1.5 rounded-sm text-[#D4A373]">
                <ShoppingCartIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <NavbarInferior />
    </div>
  );
};

export default DetalleProducto;

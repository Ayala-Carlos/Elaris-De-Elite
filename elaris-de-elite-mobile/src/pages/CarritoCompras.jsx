import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarInferior from '../components/NavBarInferior.jsx';
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';
import { ShoppingCartIcon, MagnifyingGlassIcon, TrashIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Boton from '../components/Boton.jsx';

const itemsIniciales = [
  {
    id: 1,
    marca: 'Labiales',
    nombre: 'Double-Take Creme and Powder Blush Duo',
    imagen: 'https://patrickta.com/cdn/shop/products/DoubleTakeBlush_ShesThatGirl_1_800x.jpg',
    precio: 40.0,
    cantidad: 1
  },
  {
    id: 2,
    marca: 'Rubores',
    nombre: 'Runway Matte Lipstick Color with Hydrating, 12H Longwear',
    imagen: 'https://images.unsplash.com/photo-1619451334792-15030b1b1f5d?auto=format&fit=crop&w=700&q=80',
    precio: 62.0,
    cantidad: 1
  }
];

const CarritoCompras = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(itemsIniciales);
  const [codigoDescuento, setCodigoDescuento] = useState('');

  const subtotal = useMemo(() => items.reduce((total, item) => total + item.precio * item.cantidad, 0), [items]);
  const envio = subtotal > 100 ? 0 : 0;
  const iva = subtotal * 0.16;
  const total = subtotal + iva + envio;

  const modificarCantidad = (id, delta) => {
    setItems((actuales) =>
      actuales.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item,
      ),
    );
  };

  const eliminarItem = (id) => {
    setItems((actuales) => actuales.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#FAF4ED] min-h-screen pb-24">
      <header className="bg-[#FAF4ED] px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#F0E6D8]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-[#E7C4B2] rounded-full flex items-center justify-center font-bold text-[#E3A88E] text-[9px]">EE</div>
          <span className="font-semibold text-[11px] text-[#DE8F8F] tracking-tight">ELARIS DE ELITE</span>
        </div>
        <div className="flex items-center gap-2">
          <MagnifyingGlassIcon className="h-4.5 w-4.5 text-gray-400" />
          <ShoppingCartIcon className="h-4.5 w-4.5 text-gray-400" />
          <MenuHamburguesa />
        </div>
      </header>

      <main className="px-4 pt-4 pb-8">
        <button onClick={() => navigate('/Inicio')} className="text-[#E49D9D] text-xs font-semibold mb-4">
          ← volver a inicio
        </button>

        <h1 className="text-[28px] font-bold text-[#6B5D50] mb-2">Carrito de compras</h1>
        <p className="text-sm text-[#A08E7D] mb-6 font-semibold">Resumen de compra</p>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#F7F7F7] rounded-[2rem] p-3 border border-[#EFEFEF] shadow-sm flex items-center gap-3">
              <div className="w-28 h-24 rounded-2xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={item.imagen} alt={item.nombre} className="w-24 h-20 object-contain" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-[#D59A5C] leading-tight">{item.marca}</p>
                <p className="text-[12px] text-[#6F655D] leading-tight mt-1 pr-2">{item.nombre}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => modificarCantidad(item.id, -1)} className="text-[#6F655D]">
                    <MinusCircleIcon className="h-5 w-5" />
                  </button>
                  <span className="text-sm font-semibold text-[#6F655D]">{item.cantidad}</span>
                  <button onClick={() => modificarCantidad(item.id, 1)} className="text-[#6F655D]">
                    <PlusCircleIcon className="h-5 w-5" />
                  </button>
                  <span className="ml-auto font-semibold text-[#6F655D]">${item.precio.toFixed(2)}</span>
                  <button onClick={() => eliminarItem(item.id)} className="text-[#E49D9D] ml-1" aria-label="Eliminar producto">
                    <TrashIcon className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] p-5 border border-[#EAE0D4] shadow-sm space-y-4">
          <h2 className="text-[18px] font-bold text-[#6B5D50]">Resumen de pedido</h2>

          <div className="space-y-3 text-[#6F655D]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{envio === 0 ? 'Gratis' : `$${envio.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (16%)</span>
              <span>${iva.toFixed(2)}</span>
            </div>

            <div className="border-t border-[#D9C9B8] pt-3 flex justify-between items-center text-[#6B5D50]">
              <span className="font-semibold text-[16px]">Total</span>
              <span className="font-semibold text-[18px]">${total.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <p className="text-[#6B5D50] mb-2">Código de descuento</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={codigoDescuento}
                onChange={(event) => setCodigoDescuento(event.target.value)}
                placeholder="Ingrese el código"
                className="flex-1 border border-[#BFAE9E] bg-[#FBF6F1] px-4 py-2 rounded-md text-sm outline-none placeholder:text-[#BFAE9E]"
              />
              <Boton tipo="secundario" className="px-5 py-2 rounded-md">Aplicar</Boton>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <Boton tipo="primario" anchoTotal>Proceder con pago</Boton>
            <Boton tipo="outline" anchoTotal onClick={() => navigate('/Inicio')}>Continuar comprando</Boton>
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <Benefit texto="Envío gratuito en pedidos superiores a $100" activo />
          <Benefit texto="Devoluciones fáciles en 30 días" />
          <Benefit texto="Compra 100% segura y protegida" />
        </div>
      </main>

      <NavbarInferior />
    </div>
  );
};

const Benefit = ({ texto, activo = false }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activo ? 'bg-[#F8D5D8]' : 'bg-[#F1DFDF]'}`}>
      <span className={`text-sm ${activo ? 'text-[#E49D9D]' : 'text-[#C9B0B0]'}`}>✓</span>
    </div>
    <p className="text-sm text-[#7B6D61]">{texto}</p>
  </div>
);

export default CarritoCompras;

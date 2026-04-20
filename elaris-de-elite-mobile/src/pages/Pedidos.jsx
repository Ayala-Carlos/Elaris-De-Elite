import { useNavigate } from 'react-router-dom';
import NavbarInferior from '../components/NavBarInferior.jsx';

const pedidosMock = [
  {
    id: 1,
    estado: 'Entregado',
    ubicacion: 'San Salvador, El Salvador',
    productos: 3,
    total: 89.99,
    fecha: '12/04/2026'
  },
  {
    id: 2,
    estado: 'En camino',
    ubicacion: 'Santa Ana, El Salvador',
    productos: 2,
    total: 54.5,
    fecha: '17/04/2026'
  }
];

const PedidoCard = ({ estado, ubicacion, productos, total, fecha }) => (
  <div className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="bg-[#F3EEE7] p-4 rounded-2xl">
      <span className="text-xl">🧺</span>
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start gap-2">
        <span className={`text-xs font-bold ${estado.includes('Entregado') ? 'text-green-500' : 'text-orange-400'}`}>
          {estado} {fecha ? `- ${fecha}` : ''}
        </span>
        <span className="font-bold text-[#5B4D42]">${total.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{ubicacion}</p>
      <p className="text-xs text-gray-500">{productos} productos</p>
      <button className="text-[10px] text-[#D4A373] mt-2 font-bold underline">Ver detalles del pedido</button>
    </div>
  </div>
);

const Pedidos = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF4ED] min-h-screen pb-24">
      <div className="p-6">
        <button onClick={() => navigate('/Inicio')} className="text-[#D4A373] text-sm mb-4">← volver a inicio</button>

        <h1 className="text-2xl font-bold text-[#5B4D42] mb-1">Mis pedidos</h1>
        <p className="text-sm text-gray-500 mb-6">Revisa el estado de tus compras</p>

        {pedidosMock.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            estado={pedido.estado}
            ubicacion={pedido.ubicacion}
            productos={pedido.productos}
            total={pedido.total}
            fecha={pedido.fecha}
          />
        ))}
      </div>

      <NavbarInferior />
    </div>
  );
};

export default Pedidos;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import NavbarInferior from '../components/NavBarInferior.jsx';
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.jpg';
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  MagnifyingGlassIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import 'swiper/css';
import 'swiper/css/pagination';

// --- DATOS DE LOS PRODUCTOS (Basados en tus capturas) ---
const productosHome = [
  {
    id: 'rare-beauty-soft-pinch',
    categoria: 'rubor',
    marca: 'Rare Beauty',
    nombre: 'Soft Pinch Powder Blush',
    imagen: 'https://www.rarebeauty.com/cdn/shop/products/SoftPinchLuminousPowderBlush_Joy_1_800x.jpg',
    precio: 27.0,
    colores: ['#F5B5B8', '#EF969F', '#E97786', '#E2586D', '#D93954']
  },
  {
    id: 'patrick-ta-double-take',
    categoria: 'rubor',
    marca: 'Patrick Ta',
    nombre: 'Double-Take Creme Blush Duo',
    imagen: 'https://patrickta.com/cdn/shop/products/DoubleTakeBlush_ShesThatGirl_1_800x.jpg',
    precio: 40.0,
    colores: ['#F4A0B0', '#EC869A', '#E56D84', '#DD536E', '#D53958', '#BA304B']
  },
  {
    id: 'armani-cheek-tint',
    categoria: 'rubor',
    marca: 'Armani Beauty',
    nombre: 'Cheek Tint Liquid Blush',
    imagen: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    precio: 40.0,
    colores: ['#E69FB2', '#DB7893', '#CF5274', '#C42B54']
  },
  {
    id: 'westman-atelier-baby-cheeks',
    categoria: 'rubor',
    marca: 'Westman Atelier',
    nombre: 'Baby Cheeks Powder Blush Duo',
    imagen: 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=600&q=80',
    precio: 75.0,
    colores: ['#E4A2AF', '#D88295', '#CC627B']
  },
  {
    id: 'prada-soft-matte-foundation',
    categoria: 'base',
    marca: 'Prada',
    nombre: 'Optimizing Refillable Soft Matte Foundation',
    imagen: 'https://images.unsplash.com/photo-1596704017254-9755b52df221?auto=format&fit=crop&w=600&q=80',
    precio: 70.0,
    colores: ['#FCEBDB', '#F2D5BE', '#E8BFA1', '#DEA984']
  },
  {
    id: 'givenchy-prisme-libre-glow',
    categoria: 'base',
    marca: 'Givenchy',
    nombre: 'Prisme Libre Glow Foundation',
    imagen: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    precio: 61.0,
    colores: ['#F9E4D1', '#EFC9A8', '#E5AE7F', '#DB9356']
  },
  {
    id: 'dior-backstage-foundation',
    categoria: 'base',
    marca: 'Dior',
    nombre: 'Backstage Face and Body Foundation',
    imagen: 'https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?auto=format&fit=crop&w=600&q=80',
    precio: 45.0,
    colores: ['#F3E1CF', '#E6C7A8', '#D9AD81', '#CC935A']
  },
  {
    id: 'u-beauty-super-tinted',
    categoria: 'base',
    marca: 'U Beauty',
    nombre: 'The Super Tinted Hydrator',
    imagen: 'https://images.unsplash.com/photo-1556228578-dd6ab8f1d0dc?auto=format&fit=crop&w=600&q=80',
    precio: 100.0,
    colores: ['#F8E6D4', '#EDD1B6', '#E2BC98', '#D7A77A']
  }
];

const bannersHome = [
  {
    id: 'coleccion-glowgasm',
    titulo: 'Nueva colección:',
    subtitulo: 'Colección Glowgasm Charlotte Tilbury',
    imagen: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rubores-virales',
    titulo: 'Lo más vendido:',
    subtitulo: 'Rubores virales para look natural',
    imagen: 'https://images.unsplash.com/photo-1596704017254-9755b52df221?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bases-soft-matte',
    titulo: 'Tendencias 2026:',
    subtitulo: 'Bases ligeras acabado soft matte',
    imagen: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80'
  }
];

// --- SUB-COMPONENTES DE LA PÁGINA ---

const HeaderPrincipal = ({ query, onQueryChange, onCartClick }) => (
  <header className="bg-[#FAF4ED] px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-[#F0E6D8]">
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="Elaris de Elite"
        className="h-10 w-10 rounded-full object-cover border border-[#E4C28B] bg-[#F9F0EE]"
      />
      <span className="text-[13px] text-[#E06270] tracking-wide" style={{ fontFamily: "'Cinzel', 'Times New Roman', serif" }}>
        ELARIS DE ELITE
      </span>
    </div>
    <div className="flex-grow max-w-[145px] mx-2 relative">
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Buscar"
        className="w-full bg-[#F4ECE3] rounded-full py-1 pl-3 pr-8 text-[11px] outline-none placeholder:text-[#AFA69A] text-[#5D5248]"
      />
      <MagnifyingGlassIcon className="h-3.5 w-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
    </div>
    <div className="flex items-center gap-2">
      <button onClick={onCartClick} aria-label="Abrir carrito">
        <ShoppingCartIcon className="h-4.5 w-4.5 text-gray-400" />
      </button>
      <MenuHamburguesa />
    </div>
  </header>
);

const BannerHero = () => (
  <section className="rounded-2xl overflow-hidden shadow-sm border border-[#E9E2DA]">
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3200, disableOnInteraction: false }}
      loop
      className="h-44"
    >
      {bannersHome.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative h-44">
            <img src={banner.imagen} alt={banner.subtitulo} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-4 bottom-4 right-4">
              <h2 className="text-white text-[17px] font-bold leading-tight">{banner.titulo}</h2>
              <p className="text-white text-[35px] font-extrabold leading-[0.95]">{banner.subtitulo}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

const ProductCard = ({ producto, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left bg-[#F3EEE7] rounded-lg p-3 border border-transparent hover:border-[#E5D5C6] transition-colors"
  >
    <div className="h-24 rounded-md bg-[#ECECEC] flex items-center justify-center overflow-hidden">
      <img src={producto.imagen} alt={producto.nombre} className="h-20 object-contain" />
    </div>
    <h4 className="font-extrabold text-[13px] text-[#312B26] mt-2 leading-none">{producto.marca}</h4>
    <p className="text-[11px] text-[#86807A] mt-1 leading-[1.2] min-h-[30px]">{producto.nombre}</p>
    <div className="flex items-center gap-1 mt-1.5">
      {producto.colores.slice(0, 6).map((color) => (
        <span key={color} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </div>
    <div className="mt-2.5 flex items-center justify-between">
      <span className="text-[13px] text-[#7B6D61] font-semibold">${producto.precio.toFixed(2)}</span>
      <ShoppingBagIcon className="h-4 w-4 text-[#C8A88E]" />
    </div>
  </button>
);

const SeccionProductos = ({ titulo, categoria, productos, onVerMas, onProducto }) => (
  <section>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-[19px] font-semibold text-[#7E7771] leading-none">{titulo}</h3>
      <button onClick={onVerMas} className="text-[9px] text-[#A8A09A]">
        Ver mas →
      </button>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {productos
        .filter((p) => p.categoria === categoria)
        .slice(0, 4)
        .map((p) => (
          <ProductCard key={p.id} producto={p} onClick={() => onProducto(p)} />
        ))}
    </div>
  </section>
);

// --- PANTALLA PRINCIPAL ---
const Inicio = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const irADetalleProducto = (producto) => {
    navigate(`/producto/${producto.id}`, { state: { producto } });
  };

  const productosFiltrados = useMemo(() => {
    const texto = query.trim().toLowerCase();

    if (!texto) {
      return {
        rubor: productosHome.filter((producto) => producto.categoria === 'rubor').slice(0, 4),
        base: productosHome.filter((producto) => producto.categoria === 'base').slice(0, 4),
      };
    }

    const coincide = (producto) =>
      [producto.marca, producto.nombre, producto.categoria]
        .join(' ')
        .toLowerCase()
        .includes(texto);

    return {
      rubor: productosHome.filter((producto) => producto.categoria === 'rubor' && coincide(producto)),
      base: productosHome.filter((producto) => producto.categoria === 'base' && coincide(producto)),
    };
  }, [query]);

  return (
    <div className="bg-[#FAF4ED] min-h-screen">
      <HeaderPrincipal
        query={query}
        onQueryChange={setQuery}
        onCartClick={() => navigate('/carrito')}
      />

      <main className="px-4 pt-5 pb-28 space-y-4">
        <h1 className="text-[37px] font-bold text-[#5D5248] leading-none">Bienveni@ Andrea</h1>

        <BannerHero />

        <div className="bg-[#F8EAEB] rounded-md py-3 text-center border border-[#F0DFE0]">
          <h3 className="font-bold text-[#E26D73] text-[36px]">Productos destacados</h3>
        </div>

        {(!query.trim() || productosFiltrados.rubor.length > 0) ? (
          <SeccionProductos
            titulo="Rubores"
            categoria="rubor"
            productos={productosFiltrados.rubor}
            onVerMas={() => navigate('/categoria/rubor')}
            onProducto={irADetalleProducto}
          />
        ) : null}

        {(!query.trim() || productosFiltrados.base.length > 0) ? (
          <SeccionProductos
            titulo="Bases"
            categoria="base"
            productos={productosFiltrados.base}
            onVerMas={() => navigate('/categoria/base')}
            onProducto={irADetalleProducto}
          />
        ) : null}

        {query.trim() && !productosFiltrados.rubor.length && !productosFiltrados.base.length ? (
          <p className="text-sm text-[#7B6D61] text-center pt-4">
            No encontramos productos para “{query}”.
          </p>
        ) : null}
      </main>

      <NavbarInferior />
    </div>
  );
};

export default Inicio;
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarInferior from '../components/NavBarInferior.jsx';
import MenuHamburguesa from '../components/MenuHamburguesa.jsx';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const HeaderPrincipal = () => (
  <header className="bg-[#FAF4ED] px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#F0E6D8]">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 border border-[#E7C4B2] rounded-full flex items-center justify-center font-bold text-[#E3A88E] text-[9px]">EE</div>
      <span className="font-semibold text-[11px] text-[#DE8F8F] tracking-tight">ELARIS DE ELITE</span>
    </div>
    <div className="flex-grow max-w-[145px] mx-2 relative">
      <input type="search" placeholder="Buscar" className="w-full bg-[#EEE7DF] rounded-full py-1 pl-3 pr-8 text-[11px] outline-none" />
      <MagnifyingGlassIcon className="h-3.5 w-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
    </div>
    <div className="flex items-center gap-2">
      <button onClick={() => navigate('/carrito')} aria-label="Abrir carrito">
        <ShoppingCartIcon className="h-4.5 w-4.5 text-gray-400" />
      </button>
      <MenuHamburguesa />
    </div>
  </header>
);

const ProductCard = ({ producto, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#F2F2F2] rounded-md p-2.5 text-left border border-transparent hover:border-[#4BA4F5] transition-colors"
  >
    <div className="bg-[#EFEFEF] rounded-sm h-24 flex items-center justify-center">
      <img src={producto.imagen} alt={producto.nombre} className="h-20 object-contain" />
    </div>
    <h3 className="font-extrabold text-[#2F2A27] text-[19px] leading-none mt-2.5">{producto.marca}</h3>
    <p className="text-[11px] text-gray-500 mt-1 leading-tight min-h-8">{producto.nombre}</p>

    <div className="flex items-center gap-1 mt-1.5">
      {producto.colores.map((color) => (
        <span key={color} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </div>

    <div className="mt-1.5 flex items-center justify-between">
      <span className="text-[11px] text-[#7E7065] font-medium">${producto.precio.toFixed(2)}</span>
      <ShoppingBagIcon className="h-3.5 w-3.5 text-[#CBAF95]" />
    </div>
  </button>
);

const CategoriaProductos = () => {
  const navigate = useNavigate();
  const { categoriaId } = useParams();

  const categorias = {
    rubor: {
      nombre: 'Rubores',
      productos: [
        {
          id: 'rare-beauty-soft-pinch',
          marca: 'Rare Beauty',
          nombre: 'Soft Pinch Luminous Powder Blush',
          imagen: 'https://www.rarebeauty.com/cdn/shop/products/SoftPinchLuminousPowderBlush_Joy_1_800x.jpg',
          precio: 27,
          colores: ['#F3B5B5', '#E79F9F', '#DB8989', '#CF7373', '#C35D5D']
        },
        {
          id: 'patrick-ta-double-take',
          marca: 'Patrick Ta',
          nombre: 'Double-Take Creme and Powder Blush Duo',
          imagen: 'https://patrickta.com/cdn/shop/products/DoubleTakeBlush_ShesThatGirl_1_800x.jpg',
          precio: 40,
          colores: ['#F2A8B8', '#EC90A5', '#E67892', '#E0607F', '#DA486C', '#D43059']
        },
        {
          id: 'make-up-forever-palette',
          marca: 'Make Up Forever',
          nombre: 'HD Skin Blush and Glow Longwear Cream Face Palette',
          imagen: 'https://images.unsplash.com/photo-1583241800698-9d516f9c3f3c?auto=format&fit=crop&w=700&q=80',
          precio: 27,
          colores: ['#FA9BA3', '#F57D91', '#F05F7F', '#EA416D', '#E5235B']
        },
        {
          id: 'dior-rosy-glow',
          marca: 'Dior',
          nombre: 'Rosy Glow Powder Blush',
          imagen: 'https://images.unsplash.com/photo-1643014758071-3a7f48e94f15?auto=format&fit=crop&w=700&q=80',
          precio: 27,
          colores: ['#F27BB6', '#E865A7', '#DE4F98', '#D43989', '#CA237A']
        }
      ]
    },
    base: {
      nombre: 'Bases',
      productos: [
        {
          id: 'dior-backstage-foundation',
          marca: 'Dior',
          nombre: 'Backstage Face and Body Foundation',
          imagen: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80',
          precio: 45,
          colores: ['#F4E3D2', '#EED6C1', '#E7C8AF', '#E1BA9D', '#DAAC8B']
        },
        {
          id: 'prada-soft-matte-foundation',
          marca: 'Prada',
          nombre: 'Optimizing Refillable Soft Matte Foundation',
          imagen: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
          precio: 70,
          colores: ['#F9EBDD', '#F0D8C1', '#E7C5A5', '#DEB289', '#D59F6D']
        },
        {
          id: 'nars-light-reflecting',
          marca: 'Nars',
          nombre: 'Light Reflecting Foundation',
          imagen: 'https://images.unsplash.com/photo-1596704017254-9755b52df221?auto=format&fit=crop&w=700&q=80',
          precio: 52,
          colores: ['#FCEEDC', '#F2DABB', '#E8C79A', '#DEB479', '#D4A158']
        },
        {
          id: 'tom-ford-shade-illuminate',
          marca: 'Tom Ford',
          nombre: 'Shade and Illuminate Soft Radiance Foundation',
          imagen: 'https://images.unsplash.com/photo-1512203492609-9724d4d50cb8?auto=format&fit=crop&w=700&q=80',
          precio: 62,
          colores: ['#F6E3D3', '#EBCBB0', '#E0B38D', '#D59B6A', '#CA8347']
        }
      ]
    },
    correctores: {
      nombre: 'Correctores',
      productos: [
        {
          id: 'dior-forever-skin-correct',
          marca: 'Dior',
          nombre: 'Forever Skin Correct Concealer',
          imagen: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
          precio: 38,
          colores: ['#F9E9D7', '#EFD2B6', '#E4B995', '#D99F74']
        },
        {
          id: 'nars-radiant-creamy',
          marca: 'Nars',
          nombre: 'Radiant Creamy Concealer',
          imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80',
          precio: 32,
          colores: ['#F7E6D7', '#ECCDAD', '#E0B484', '#D59B62']
        },
        {
          id: 'u-beauty-skin-tint',
          marca: 'U Beauty',
          nombre: 'The Skin Tint Corrector',
          imagen: 'https://images.unsplash.com/photo-1556228578-dd6ab8f1d0dc?auto=format&fit=crop&w=700&q=80',
          precio: 36,
          colores: ['#F7E7D7', '#EBCDB0', '#DFB58F', '#D39C6C']
        },
        {
          id: 'make-up-forever-corrector',
          marca: 'Make Up Forever',
          nombre: 'HD Skin Corrector',
          imagen: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80',
          precio: 34,
          colores: ['#F9EBDD', '#EFD5BC', '#E5BF9C', '#DBA67B']
        }
      ]
    },
    iluminadores: {
      nombre: 'Iluminadores',
      productos: [
        {
          id: 'charlotte-tilbury-highlight',
          marca: 'Charlotte Tilbury',
          nombre: 'Beauty Light Wand',
          imagen: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=700&q=80',
          precio: 42,
          colores: ['#FFF1DC', '#F8DFC0', '#F0CFA2', '#E7BE83']
        },
        {
          id: 'dior-backstage-glow',
          marca: 'Dior',
          nombre: 'Backstage Glow Face Palette',
          imagen: 'https://images.unsplash.com/photo-1523424111068-6a03f57d0e3d?auto=format&fit=crop&w=700&q=80',
          precio: 48,
          colores: ['#FFF3E0', '#F8E0BF', '#F1CC9C', '#E8B979']
        },
        {
          id: 'rare-beauty-luminizer',
          marca: 'Rare Beauty',
          nombre: 'Positive Light Silky Touch Highlighter',
          imagen: 'https://images.unsplash.com/photo-1631211134984-7a3f3bd6e955?auto=format&fit=crop&w=700&q=80',
          precio: 30,
          colores: ['#FFF5E7', '#F7E2C5', '#EFD09F', '#E6BC79']
        },
        {
          id: 'westman-atelier-glow',
          marca: 'Westman Atelier',
          nombre: 'Lit Up Highlight Stick',
          imagen: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80',
          precio: 48,
          colores: ['#FFF4E8', '#F6DFC0', '#EBCB96', '#E0B66D']
        }
      ]
    }
  };

  const categoriaActiva = useMemo(() => {
    return categorias[categoriaId] || categorias.rubor;
  }, [categoriaId]);

  return (
    <div className="bg-[#FAF4ED] min-h-screen pb-24">
      <HeaderPrincipal />

      <main className="px-4 pt-4 pb-8">
        <button onClick={() => navigate('/Inicio')} className="text-[#E49D9D] text-xs font-semibold mb-4">
          ← volver a inicio
        </button>

        <div className="bg-[#F9E9EA] rounded-md py-3 text-center mb-5">
          <h2 className="font-bold text-[#E36D75] text-[35px] tracking-tight leading-none">{categoriaActiva.nombre}</h2>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {categoriaActiva.productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onClick={() => navigate(`/producto/${producto.id}`, { state: { producto } })}
            />
          ))}
        </div>
      </main>

      <NavbarInferior />
    </div>
  );
};

export default CategoriaProductos;

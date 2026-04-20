import { ShoppingCartIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const HeaderInicio = () => (
  <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#F8F1ED] rounded-full flex items-center justify-center text-[10px] font-bold text-[#D4A373]">ÉE</div>
      <span className="text-[10px] font-bold text-[#D4A373] tracking-tighter">ÉLARIS DE ÉLITE</span>
    </div>
    
    <div className="relative flex-grow mx-3">
      <input type="text" placeholder="Buscar" className="w-full bg-[#F3EEE7] rounded-full py-1 px-4 pr-8 text-xs outline-none" />
      <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute right-2 top-1.5" />
    </div>

    <div className="flex gap-3 text-gray-400">
      <ShoppingCartIcon className="h-6 w-6" />
      <Bars3Icon className="h-6 w-6" />
    </div>
  </header>
);
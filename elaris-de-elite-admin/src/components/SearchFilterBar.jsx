export default function SearchFilterBar({ 
  placeholder, 
  onSearchChange, // <--- Para buscar en el buscador
  filters = [], 
  activeFilter, 
  onFilterClick 
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#ede8e0] flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[250px]">
        <input
          type="text"
          placeholder={placeholder}
          // CADA VEZ que el usuario escribe, ejecutamos onSearchChange
          onChange={(e) => onSearchChange(e.target.value)} 
          className="w-full border border-[#c8a87a] rounded-full px-5 py-2.5 text-sm text-[#3b2a2a] outline-none placeholder:text-[#9a8a8a] focus:ring-1 focus:ring-[#c8a87a]"
        />
      </div>

      {/* Botones de filtro (opcionales) */}
      {filters.length > 0 && (
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterClick(filter)}
              className={`px-6 py-2.5 rounded-full text-sm transition-all border ${
                activeFilter === filter
                  ? "bg-[#c8a87a] text-white border-[#c8a87a] font-bold"
                  : "bg-white text-[#7a6a6a] border-[#c8a87a] hover:bg-[#f5f0eb]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
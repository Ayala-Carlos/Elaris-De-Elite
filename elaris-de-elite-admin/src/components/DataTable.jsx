export default function DataTable({ headers, gridCols, data, renderRow }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#ede8e0] overflow-hidden">
      
      {/* Table Header Dinámico */}
      <div className={`grid ${gridCols} bg-[#8a7a6a] text-white px-6 py-4 text-sm font-medium`}>
        {headers.map((header, index) => (
          <div key={index} className={header === "Acciones" ? "text-center" : ""}>
            {header}
          </div>
        ))}
      </div>

      {/* Table Body Dinámico */}
      <div className="flex flex-col">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className={`grid ${gridCols} items-center px-6 py-4 text-sm text-[#3b2a2a] ${
              index !== data.length - 1 ? "border-b border-[#ede8e0]" : ""
            }`}
          >
            {/* Aquí ejecutamos la función que la página nos pasó para dibujar las celdas */}
            {renderRow(item)}
          </div>
        ))}
      </div>
      
    </div>
  );
}
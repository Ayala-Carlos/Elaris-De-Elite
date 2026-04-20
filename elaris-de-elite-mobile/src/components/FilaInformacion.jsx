// src/componentes/FilaInformacion.jsx
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const FilaInformacion = ({ etiqueta, valor }) => (
  <div className="flex justify-between items-center py-3 border-b border-[#EAE6DF] last:border-0">
    <div className="text-sm">
      <span className="text-gray-500 font-medium">{etiqueta}: </span>
      <span className="text-[#5B4D42] font-semibold">{valor}</span>
    </div>
    <PencilSquareIcon className="h-4 w-4 text-gray-400" />
  </div>
);

export default FilaInformacion;
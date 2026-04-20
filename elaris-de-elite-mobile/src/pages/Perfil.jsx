import FilaInfo from '../components/FilaInformacion.jsx';
import Boton from '../components/Boton.jsx';
import NavbarInferior from '../components/NavBarInferior.jsx';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const Perfil = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF4ED] min-h-screen pb-24">
      {/* Header con flecha volver */}
      <div className="p-6">
        <button onClick={() => navigate('/Inicio')} className="text-[#D4A373] text-sm mb-4">← volver a inicio</button>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white shadow-sm overflow-hidden">
              <img src="/avatar-placeholder.png" alt="Andrea" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md">
              <PencilSquareIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-[#5B4D42] mt-4">Pepesus</h2>
        </div>

        {/* Tarjeta de Información */}
        <div className="bg-[#F8F1ED] rounded-3xl p-6 border border-[#EAE6DF]">
          <h3 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">Información personal</h3>
          <FilaInfo etiqueta="Nombre de usuario" valor="pepesus" />
          <FilaInfo etiqueta="Correo" valor="pepon@gmail.com" />
          <FilaInfo etiqueta="Teléfono" valor="1234-5678" />
          <FilaInfo etiqueta="Contraseña" valor="**********" />
          <FilaInfo etiqueta="País" valor="El Salvador" />
          <FilaInfo etiqueta="Dirección" valor="El Salvador, San Salvador" />

          <div className="mt-8">
            <Boton tipo="primario" anchoTotal onClick={() => navigate('/Bienvenida')}>
              Cerrar sesión
            </Boton>
          </div>
        </div>
      </div>
      <NavbarInferior />
    </div>
  );
};

export default Perfil;
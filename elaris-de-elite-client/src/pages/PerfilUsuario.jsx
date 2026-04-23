import { useState } from "react";
import { User, LogOut, MapPin, Phone, Mail, Edit2, Check } from "lucide-react";
import NavBar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";

// COLORES
const C = {
  rojo: "#DE4B52",
  dorado: "#D4A574",
  marron: "#6B5B4E",
  fondo: "#FAF8F5",
  rosa: "#E8949B",
  crema: "#F2E7E1",
};

//  DATA
const usuario = {
  nombre: "María Fernández",
  email: "maria.fernandez@gmail.com",
  telefono: "+503 7890-1234",
  direccion: "Col. Escalón, San Salvador",
  miembro: "Miembro Gold",
  desde: "Enero 2023",
  iniciales: "MF",
  pedidos: 12,
  puntos: 850,
};

// COMPONENTE STAT
const Stat = ({ val, label }) => (
  <div className="text-center bg-white/20 px-4 py-2 rounded-lg">
    <p className="text-lg font-bold text-white">{val}</p>
    <p className="text-xs text-white/80">{label}</p>
  </div>
);

// TAB PERFIL
const TabPerfil = () => {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombre: usuario.nombre,
    email: usuario.email,
    telefono: usuario.telefono,
    direccion: usuario.direccion,
  });

  const Campo = ({ label, fieldKey, icon }) => (
    <div>
      <label className="text-xs font-semibold text-[#6B5B4E] block mb-1">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]">
          {icon}
        </span>

        <input
          value={form[fieldKey]}
          disabled={!editando}
          onChange={(e) => setForm({ ...form, [fieldKey]: e.target.value })}
          className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm outline-none
          ${
            editando
              ? "border-2 border-[#D4A574] bg-white"
              : "border border-[#E8D5CA] bg-[#FAF8F5]"
          }`}
        />
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-[#6B5B4E]">
          Información personal
        </h3>

        <button
          onClick={() => setEditando(!editando)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border
          ${
            editando
              ? "bg-[#D4A574] text-white border-[#D4A574]"
              : "text-[#D4A574] border-[#D4A574]"
          }`}
        >
          {editando ? <Check size={14} /> : <Edit2 size={14} />}
          {editando ? "Guardar" : "Editar"}
        </button>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Campo
          label="Nombre completo"
          fieldKey="nombre"
          icon={<User size={14} />}
        />
        <Campo
          label="Correo electrónico"
          fieldKey="email"
          icon={<Mail size={14} />}
        />
        <Campo
          label="Teléfono"
          fieldKey="telefono"
          icon={<Phone size={14} />}
        />
        <Campo
          label="Dirección"
          fieldKey="direccion"
          icon={<MapPin size={14} />}
        />
      </div>

      {/* Extra */}
      <div className="mt-6 p-4 bg-[#F2E7E1] rounded-lg border border-[#E8D5CA]">
        <p className="text-xs font-semibold text-[#6B5B4E] mb-1">
          Cambiar contraseña
        </p>
        <p className="text-xs text-gray-500">
          Te enviaremos un enlace a tu correo.
        </p>

        <button className="mt-3 border border-[#DE4B52] text-[#DE4B52] px-4 py-2 rounded-lg text-xs font-semibold">
          Solicitar cambio
        </button>
      </div>
    </div>
  );
};

// MAIN
const PerfilUsuario = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* HEADER */}
        <div
          className="bg-gradient-to-r from-[#E8949B] via-[#E8A0A8] to-[#D4A574]
          px-4 sm:px-6 md:px-10 py-6 flex flex-col md:flex-row items-center gap-6"
        >
          {/* Avatar */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center 
            text-xl font-bold text-[#E8949B] border-4 border-white/60"
          >
            {usuario.iniciales}
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {usuario.nombre}
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              {usuario.email} · Desde {usuario.desde}
            </p>

            <span className="inline-block mt-2 text-xs font-bold bg-white/30 text-white px-3 py-1 rounded-full">
              ✦ {usuario.miembro}
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <Stat val={usuario.pedidos} label="Pedidos" />
            <Stat val={usuario.puntos} label="Puntos" />
          </div>
        </div>

        {/* LAYOUT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 grid gap-6 lg:grid-cols-4">
          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            {/* CONTENEDOR */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2">
              {/* TAB PERFIL */}
              <div className="bg-white border border-[#E8D5CA] rounded-lg min-w-[180px]">
                <div className="flex items-center gap-2 p-4 bg-[#F2E7E1] border-l-4 border-[#D4A574]">
                  <User size={16} className="text-[#D4A574]" />
                  <span className="text-sm font-bold text-[#6B5B4E]">
                    Mi perfil
                  </span>
                </div>
              </div>

              {/* ESPACIO SOLO EN DESKTOP */}
              <div className="hidden lg:block h-4"></div>

              {/* BOTÓN LOGOUT */}
              <button
                className="
                min-w-[180px]
                flex items-center justify-center gap-2 
                px-4 py-3 
                border border-[#F5D6D8] 
                rounded-lg 
                bg-white 
                text-[#DE4B52] 
                text-sm font-semibold
                hover:bg-[#FDECEC] 
                transition
                lg:mt-2
                "
                >
                <LogOut size={16} />
                <Link to="/login">
                    Cerrar sesión
                </Link>
              </button>
            </div>
          </aside>

          {/* CONTENIDO */}
          <section className="lg:col-span-3 bg-white border border-[#E8D5CA] rounded-xl p-4 sm:p-6">
            <TabPerfil />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PerfilUsuario;
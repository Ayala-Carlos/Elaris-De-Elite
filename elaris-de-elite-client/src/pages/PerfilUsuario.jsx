import { useState } from "react";
import {
  User,
  LogOut,
  MapPin,
  Phone,
  Mail,
  Edit2,
  Check,
} from "lucide-react";
import NavBar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

const Campo = ({
  label,
  fieldKey,
  icon,
  value,
  editando,
  onChange,
  error,
  type = "text",
}) => (
  <div>
    <label className="text-xs font-semibold text-[#6B5B4E] block mb-1">
      {label}
    </label>

    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]">
        {icon}
      </span>

      <input
        type={type}
        value={value}
        disabled={!editando}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm outline-none transition-all
        ${
          error
            ? "border-2 border-red-400 bg-white"
            : editando
            ? "border-2 border-[#D4A574] bg-white shadow-sm"
            : "border border-[#E8D5CA] bg-[#FAF8F5]"
        }`}
      />
    </div>

    {error && (
      <p className="text-[10px] text-red-500 mt-1 font-medium">
        {error}
      </p>
    )}
  </div>
);

const TabPerfil = () => {
  const [editando, setEditando] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [errores, setErrores] = useState({});

  const [form, setForm] = useState({
    nombre: "María Fernández",
    email: "maria.fernandez@gmail.com",
    telefono: "+503 7890-1234",
    direccion: "Col. Escalón, San Salvador",
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });

    if (errores[key]) {
      setErrores({ ...errores, [key]: null });
    }
  };

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleGuardar = (e) => {
    e.preventDefault();

    if (!validarEmail(form.email)) {
      setErrores({ email: "Introduce un correo válido" });
      return;
    }

    setEditando(false);
    setErrores({});
  };

  return (
    <form onSubmit={handleGuardar}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-[#6B5B4E]">
          Información personal
        </h3>

        {editando ? (
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#D4A574] text-white border border-[#D4A574] hover:bg-[#b88d5c] transition"
          >
            <Check size={14} /> Guardar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              console.log("CLICK EDITAR");
              setEditando(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[#D4A574] text-[#D4A574] hover:bg-[#FDF2EC] transition"
          >
            <Edit2 size={14} /> Editar
          </button>
        )}
      </div>

      {/* CAMPOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Campo
          label="Nombre completo"
          fieldKey="nombre"
          icon={<User size={14} />}
          value={form.nombre}
          editando={editando}
          onChange={handleInputChange}
        />

        <Campo
          label="Correo electrónico"
          fieldKey="email"
          type="email"
          icon={<Mail size={14} />}
          value={form.email}
          editando={editando}
          onChange={handleInputChange}
          error={errores.email}
        />

        <Campo
          label="Teléfono"
          fieldKey="telefono"
          icon={<Phone size={14} />}
          value={form.telefono}
          editando={editando}
          onChange={handleInputChange}
        />

        <Campo
          label="Dirección"
          fieldKey="direccion"
          icon={<MapPin size={14} />}
          value={form.direccion}
          editando={editando}
          onChange={handleInputChange}
        />
      </div>

      {/* CONTRASEÑA */}
      <div className="mt-6 p-4 bg-[#F2E7E1] rounded-2xl border border-[#E8D5CA]">
        <p className="text-xs font-semibold text-[#6B5B4E] mb-1">
          Cambiar contraseña
        </p>
        <p className="text-[11px] text-gray-500">
          Te enviaremos un enlace de seguridad.
        </p>

        <button
          type="button"
          onClick={() => setCorreoEnviado(true)}
          className={`mt-3 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            correoEnviado
              ? "bg-green-100 text-green-600 border border-green-200"
              : "bg-white border border-[#DE4B52] text-[#DE4B52] hover:bg-[#DE4B52] hover:text-white"
          }`}
        >
          {correoEnviado ? "✓ Enlace enviado" : "Solicitar cambio"}
        </button>
      </div>
    </form>
  );
};

const PerfilUsuario = () => {
  const usuario = {
    nombre: "María Fernández",
    email: "maria.fernandez@gmail.com",
    miembro: "Miembro Gold",
    desde: "Enero 2023",
    iniciales: "MF",
    pedidos: 12,
    puntos: 850,
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#E8949B] to-[#D4A574] px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-serif text-[#E8949B] border-4 border-white/30 shadow-lg">
              {usuario.iniciales}
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-white">
                {usuario.nombre}
              </h2>
              <p className="text-white/80 text-sm">
                {usuario.email} • Cliente desde {usuario.desde}
              </p>

              <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold text-white uppercase">
                ✦ {usuario.miembro}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/10 p-4 rounded-2xl text-center min-w-[90px]">
                <p className="text-xl font-bold text-white">
                  {usuario.pedidos}
                </p>
                <p className="text-[10px] text-white/70 uppercase">
                  Pedidos
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl text-center min-w-[90px]">
                <p className="text-xl font-bold text-white">
                  {usuario.puntos}
                </p>
                <p className="text-[10px] text-white/70 uppercase">
                  Puntos
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CONTENIDO */}
        <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 lg:grid-cols-4">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-[#E8D5CA] rounded-2xl shadow-sm">

              <div className="p-4 bg-[#F2E7E1] flex items-center gap-3">
                <User size={18} />
                <span className="font-bold text-sm">Mi Perfil</span>
              </div>
              <Link
                to="/login"
                className="w-full p-4 text-left text-sm text-[#DE4B52] font-semibold flex items-center gap-3 hover:bg-[#FAF8F5] transition"
              >
                <LogOut size={18} />
                Cerrar sesión
              </Link>

            </div>
          </aside>

          {/* FORM */}
          <section className="lg:col-span-3 bg-white border border-[#E8D5CA] rounded-[2.5rem] p-8 shadow-sm">
            <TabPerfil />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerfilUsuario;
import { useEffect, useState } from "react";
import {
  User,
  LogOut,
  Phone,
  Mail,
  Edit2,
  Check,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useOrderHistory } from "../hooks/useOrderHistory.js";

const ESTADO_LABELS = {
  pending: { label: "Pendiente", clase: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Procesando", clase: "bg-blue-100 text-blue-700" },
  shipped: { label: "Enviado", clase: "bg-indigo-100 text-indigo-700" },
  completed: { label: "Completado", clase: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelado", clase: "bg-red-100 text-red-700" },
};

const formatFecha = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const TabPedidos = () => {
  const { user } = useAuth();
  const { orders, loading, error } = useOrderHistory(user?._id);

  if (loading) {
    return <p className="text-sm text-gray-400">Cargando historial de pedidos...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Aún no has realizado ningún pedido.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        const estado = ESTADO_LABELS[order.orderStatus] || {
          label: order.orderStatus || "Desconocido",
          clase: "bg-gray-100 text-gray-600",
        };
        const productos = order.cartId?.products || [];

        return (
          <div
            key={order._id}
            className="border border-[#E8D5CA] rounded-2xl p-5 bg-[#FAF8F5]"
          >
            <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
              <div>
                <p className="text-sm font-bold text-[#6B5B4E]">
                  Pedido #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-xs text-gray-400">{formatFecha(order.orderDate)}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estado.clase}`}>
                {estado.label}
              </span>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              {productos.map((p, idx) => (
                <div key={idx} className="flex justify-between text-sm text-gray-600">
                  <span>
                    {p.productId?.name || "Producto"} × {p.quantity}
                  </span>
                  <span>${Number(p.subtotal || 0).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-[#E8D5CA] pt-3">
              <span className="text-xs text-gray-400">
                {productos.length} {productos.length === 1 ? "producto" : "productos"}
              </span>
              <span className="text-sm font-bold text-[#6B5B4E]">
                Total: ${Number(order.cartId?.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Campo = ({
  label,
  fieldKey,
  icon,
  value,
  editando,
  onChange,
  error,
  type = "text",
  autoFocus = false,
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
        autoFocus={autoFocus}
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
  const { user, updateProfile } = useAuth();
  const [editando, setEditando] = useState(false);
  const [originalForm, setOriginalForm] = useState(null);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);

  const [form, setForm] = useState({
    nombre: user?.name || "",
    email: user?.email || "",
    telefono: user?.phoneNumber || "",
  });

  useEffect(() => {
    setForm({
      nombre: user?.name || "",
      email: user?.email || "",
      telefono: user?.phoneNumber || "",
    });
  }, [user]);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });

    if (errores[key]) {
      setErrores({ ...errores, [key]: null });
    }
    setExito(false);
  };

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarTelefono = (telefono) => /^\d{10}$/.test(telefono);

  const validarForm = () => {
    const errs = {};
    const nombre = form.nombre.trim();

    if (!nombre) errs.nombre = "El nombre es requerido";
    else if (nombre.length < 3 || nombre.length > 15) errs.nombre = "Debe tener entre 3 y 15 caracteres";

    if (!form.email.trim()) errs.email = "El correo es requerido";
    else if (!validarEmail(form.email.trim())) errs.email = "Introduce un correo válido";

    if (form.telefono.trim() && !validarTelefono(form.telefono.trim())) {
      errs.telefono = "Debe tener 10 dígitos";
    }

    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!validarForm()) return;

    setGuardando(true);
    try {
      await updateProfile({
        name: form.nombre.trim(),
        email: form.email.trim(),
        phoneNumber: form.telefono.trim(),
      });
      setEditando(false);
      setOriginalForm(null);
      setErrores({});
      setExito(true);
    } catch (err) {
      setErrores({ email: err.message });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleGuardar} noValidate>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-[#6B5B4E]">
          Información personal
        </h3>

        {editando ? (
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={guardando}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#D4A574] text-white border border-[#D4A574] hover:bg-[#b88d5c] transition disabled:opacity-50"
            >
              <Check size={14} /> {guardando ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (originalForm) {
                  setForm(originalForm);
                }
                setOriginalForm(null);
                setErrores({});
                setEditando(false);
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-[#FAF8F5] transition"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setOriginalForm(form);
              setEditando(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[#D4A574] text-[#D4A574] hover:bg-[#FDF2EC] transition"
          >
            <Edit2 size={14} /> Editar
          </button>
        )}
      </div>

      {exito && (
        <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4">
          Perfil actualizado correctamente.
        </p>
      )}

      {/* CAMPOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Campo
          label="Nombre completo"
          fieldKey="nombre"
          icon={<User size={14} />}
          value={form.nombre}
          editando={editando}
          onChange={handleInputChange}
          error={errores.nombre}
          autoFocus={editando}
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
          error={errores.telefono}
        />
      </div>
    </form>
  );
};

const PerfilUsuario = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("perfil");

  const iniciales = (user?.name || "??")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const desde = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
    : "";

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#DE4B52",
      cancelButtonColor: "#6B5B4E",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        navigate("/login");
      }
    });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#E8949B] to-[#D4A574] px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-serif text-[#E8949B] border-4 border-white/30 shadow-lg">
              {iniciales}
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-white">
                {user?.name}
              </h2>
              <p className="text-white/80 text-sm">
                {user?.email}{desde ? ` • Cliente desde ${desde}` : ""}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/10 p-4 rounded-2xl text-center min-w-[90px]">
                <p className="text-xl font-bold text-white">
                  {user?.loyaltyPoints ?? 0}
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
            <div className="bg-white border border-[#E8D5CA] rounded-2xl shadow-sm overflow-hidden">

              <button
                onClick={() => setTab("perfil")}
                className={`w-full p-4 text-left text-sm font-bold flex items-center gap-3 transition ${
                  tab === "perfil" ? "bg-[#F2E7E1] text-[#6B5B4E]" : "hover:bg-[#FAF8F5] text-[#6B5B4E]"
                }`}
              >
                <User size={18} />
                Mi Perfil
              </button>

              <button
                onClick={() => setTab("pedidos")}
                className={`w-full p-4 text-left text-sm font-bold flex items-center gap-3 transition ${
                  tab === "pedidos" ? "bg-[#F2E7E1] text-[#6B5B4E]" : "hover:bg-[#FAF8F5] text-[#6B5B4E]"
                }`}
              >
                <Package size={18} />
                Mis Pedidos
              </button>

              <button
                onClick={handleLogout}
                className="w-full p-4 text-left text-sm text-[#DE4B52] font-semibold flex items-center gap-3 hover:bg-[#FAF8F5] transition"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>

            </div>
          </aside>

          {/* CONTENIDO */}
          <section className="lg:col-span-3 bg-white border border-[#E8D5CA] rounded-[2.5rem] p-8 shadow-sm">
            {tab === "perfil" ? <TabPerfil /> : <TabPedidos />}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerfilUsuario;

import React, { useState } from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Boton from "../components/Boton.jsx";
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle, RefreshCcw, Shield, X, CreditCard, Lock, User, MapPin } from "lucide-react";
import LabialDior from "../img/LabialDior.png";
import SetBrochas from "../img/SetBrochas.png";
import { Link } from "react-router-dom";

const C = {
  rojo: "#DE4B52",
  dorado: "#D4A574",
  marron: "#6B5B4E",
  fondo: "#FAF8F5",
  crema: "#F2E7E1",
};

const initialProductos = [
  { id: 1, categoria: "ACCESORIOS", nombre: "Set de brochas", precio: 150, cantidad: 1, img: SetBrochas },
  { id: 2, categoria: "LABIALES", nombre: "Dior Addict barra de labios brillante hidratante", precio: 52, cantidad: 1, img: LabialDior },
];

/* ── Campo de formulario reutilizable ── */
const Field = ({ label, placeholder, type = "text", value, onChange, icon, maxLength, error }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-[#6B5B4E]">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full ${icon ? "pl-9" : "pl-3"} pr-3 py-2.5 rounded-xl bg-[#FAF8F5] border ${error ? "border-[#DE4B52]" : "border-[#E8D5CA]"} text-sm text-[#6B5B4E] placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#D4A574]/40 transition`}
      />
    </div>
    {error && <p className="text-[10px] text-[#DE4B52] mt-0.5">{error}</p>}
  </div>
);

/* ── Modal Formulario de Pago ── */
const ModalPago = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "",
    direccion: "", ciudad: "", pais: "",
    titular: "", numero: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const formatCard = (v) =>
    v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Campo requerido";
    if (!form.email.includes("@")) e.email = "Correo inválido";
    if (!form.telefono.trim()) e.telefono = "Campo requerido";
    if (!form.direccion.trim()) e.direccion = "Campo requerido";
    if (!form.ciudad.trim()) e.ciudad = "Campo requerido";
    if (!form.pais.trim()) e.pais = "Campo requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.titular.trim()) e.titular = "Campo requerido";
    if (form.numero.replace(/\s/g, "").length < 16) e.numero = "Número de tarjeta inválido";
    if (form.expiry.length < 5) e.expiry = "Fecha inválida";
    if (form.cvv.length < 3) e.cvv = "CVV inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep1()) { setErrors({}); setStep(2); } };
  const handleSubmit = () => { if (validateStep2()) onSuccess(); };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative my-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-[#E8D5CA]">
          <div>
            <h2 className="text-xl font-bold text-[#6B5B4E]">Formulario de pago</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Paso {step} de 2 — {step === 1 ? "Datos personales" : "Método de pago"}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#6B5B4E] transition">
            <X size={20} />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="h-1 bg-[#F2E7E1] mx-7 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-[#D4A574] rounded-full transition-all duration-500"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        <div className="px-7 py-6 space-y-4">

          {/* PASO 1 — Datos personales */}
          {step === 1 && (
            <>
              <Field label="Nombre completo" placeholder="María García" value={form.nombre} onChange={set("nombre")} icon={<User size={14} />} error={errors.nombre} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Correo electrónico" placeholder="correo@email.com" type="email" value={form.email} onChange={set("email")} error={errors.email} />
                <Field label="Teléfono" placeholder="+503 0000-0000" value={form.telefono} onChange={set("telefono")} error={errors.telefono} />
              </div>
              <Field label="Dirección" placeholder="Calle, número, colonia" value={form.direccion} onChange={set("direccion")} icon={<MapPin size={14} />} error={errors.direccion} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Ciudad" placeholder="San Salvador" value={form.ciudad} onChange={set("ciudad")} error={errors.ciudad} />
                <Field label="País" placeholder="El Salvador" value={form.pais} onChange={set("pais")} error={errors.pais} />
              </div>
            </>
          )}

          {/* PASO 2 — Pago */}
          {step === 2 && (
            <>
              {/* Mini resumen */}
              <div className="bg-[#FAF8F5] rounded-xl px-4 py-3 flex justify-between items-center border border-[#E8D5CA]">
                <span className="text-sm text-[#6B5B4E]">Total a pagar</span>
                <span className="font-bold text-[#6B5B4E] text-lg">$272.60</span>
              </div>

              <Field label="Nombre del titular" placeholder="Como aparece en la tarjeta" value={form.titular} onChange={set("titular")} icon={<User size={14} />} error={errors.titular} />
              <Field
                label="Número de tarjeta"
                placeholder="0000 0000 0000 0000"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: formatCard(e.target.value) })}
                icon={<CreditCard size={14} />}
                error={errors.numero}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Vencimiento"
                  placeholder="MM/AA"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                  error={errors.expiry}
                />
                <Field label="CVV" placeholder="123" type="password" maxLength={4} value={form.cvv} onChange={set("cvv")} error={errors.cvv} />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock size={12} className="text-[#D4A574]" />
                Tus datos están protegidos con cifrado SSL
              </div>
            </>
          )}
        </div>

        {/* Botones de acción */}
        <div className="px-7 pb-7 flex gap-3">
          {step === 2 && (
            <button
              onClick={() => { setStep(1); setErrors({}); }}
              className="flex-1 py-3 rounded-full border border-[#E8D5CA] text-sm font-semibold text-[#6B5B4E] hover:bg-[#FAF8F5] transition"
            >
              ← Atrás
            </button>
          )}
          <button
            onClick={step === 1 ? handleNext : handleSubmit}
            className="flex-1 py-3 rounded-full bg-[#D4A574] hover:bg-[#c49060] text-white text-sm font-semibold transition shadow-md"
          >
            {step === 1 ? "Continuar →" : "Confirmar pago"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Modal Confirmación ── */
const ModalConfirmacion = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-10 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F2E7E1] flex items-center justify-center mx-auto mb-5">
        <CheckCircle size={32} className="text-[#D4A574]" />
      </div>
      <h2 className="text-2xl font-bold text-[#6B5B4E] mb-2">¡Compra confirmada!</h2>
      <p className="text-sm text-gray-400 leading-relaxed mb-2">
        Tu pedido ha sido procesado exitosamente. Recibirás un correo con los detalles de tu compra.
      </p>
      <p className="text-xs text-[#D4A574] font-semibold mb-8">Gracias por elegir Élaris de Elite ✨</p>

      <div className="bg-[#FAF8F5] rounded-xl px-5 py-4 text-left space-y-1 mb-8 border border-[#E8D5CA]">
        <div className="flex justify-between text-xs text-[#6B5B4E]">
          <span>Productos</span><span>2 artículos</span>
        </div>
        <div className="flex justify-between text-xs text-[#6B5B4E]">
          <span>Envío</span><span>Gratis</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-[#6B5B4E] pt-1 border-t border-[#E8D5CA] mt-1">
          <span>Total pagado</span><span>$272.60</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 rounded-full bg-[#D4A574] hover:bg-[#c49060] text-white text-sm font-semibold transition shadow-md"
      >
        Volver a la tienda
      </button>
    </div>
  </div>
);

/* ── Carrito principal ── */
const Carrito = () => {
  const [modalPago, setModalPago] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [productosState, setProductosState] = useState(initialProductos);
  const [codigo, setCodigo] = useState("");
  const [codigoAplicado, setCodigoAplicado] = useState(null);
  const [codigoError, setCodigoError] = useState("");

  const handleSuccess = () => {
    setModalPago(false);
    setModalConfirm(true);
  };

  const handleIncrement = (id) => {
    setProductosState((prev) => prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p));
  };

  const handleDecrement = (id) => {
    setProductosState((prev) => prev.map(p => p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad - 1) } : p));
  };

  const handleRemove = (id) => {
    setProductosState((prev) => prev.filter(p => p.id !== id));
  };

  const handleClear = () => {
    setProductosState([]);
    setCodigoAplicado(null);
    setCodigo("");
    setCodigoError("");
  };

  // totals
  const subtotal = productosState.reduce((s, p) => s + p.precio * p.cantidad, 0);
  const iva = +(subtotal * 0.16).toFixed(2);
  const descuento = codigoAplicado ? +(subtotal * 0.2).toFixed(2) : 0;
  const total = +(subtotal - descuento + iva).toFixed(2);

  const validCodes = ["DESCUENTO20", "AHORRA20"];

  const applyCodigo = () => {
    setCodigoError("");
    if (!codigo.trim()) {
      setCodigoError("Introduce un código de descuento");
      return;
    }
    if (!validCodes.includes(codigo.trim().toUpperCase())) {
      setCodigoError("Código inválido");
      setCodigoAplicado(null);
      return;
    }
    setCodigoAplicado(codigo.trim().toUpperCase());
    setCodigoError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto w-full">

        {/* Volver */}
        <div className="flex items-center gap-2 text-sm text-[#D4A574] cursor-pointer mb-6">
          <Link to="/productos"><ArrowLeft size={16} /></Link>
          <Link to="/productos">Continuar comprando</Link>
        </div>

        {/* Título */}
          <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#6B5B4E]">Carrito de compras</h1>
            <p className="text-xs text-gray-400">{productosState.length} artículos en el carrito</p>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 text-[#DE4B52] text-sm font-semibold"
          >
            <Trash2 size={16} />
            Vaciar carrito de compras
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Lista productos */}
          <div className="md:col-span-2 space-y-6">
            {productosState.map((p) => (
              <div key={p.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#E8D5CA]">
                <img src={p.img} alt={p.nombre} className="w-28 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-xs text-[#D4A574] font-semibold mb-1">{p.categoria}</p>
                  <h3 className="text-sm font-semibold text-[#6B5B4E] mb-3">{p.nombre}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleDecrement(p.id)} className="w-8 h-8 rounded-full border border-[#E8D5CA] flex items-center justify-center"><Minus size={14} /></button>
                      <span className="text-sm font-semibold text-[#6B5B4E]">{p.cantidad}</span>
                      <button onClick={() => handleIncrement(p.id)} className="w-8 h-8 rounded-full border border-[#E8D5CA] flex items-center justify-center"><Plus size={14} /></button>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-[#6B5B4E]">${(p.precio * p.cantidad).toFixed(2)}</p>
                      <Trash2 onClick={() => handleRemove(p.id)} size={16} className="text-[#DE4B52] cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5CA] h-fit">
            <h2 className="text-lg font-bold text-[#6B5B4E] mb-4">Resumen del pedido</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-[#6B5B4E]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[#6B5B4E]"><span>Envío</span><span>Gratis</span></div>
              {codigoAplicado && (
                <div className="flex justify-between text-[#6B5B4E]"><span>Descuento ({codigoAplicado})</span><span>-${descuento.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between text-[#6B5B4E] border-b pb-2"><span>IVA (16%)</span><span>${iva.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-[#6B5B4E] pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <div className="flex gap-2 mb-2">
              <input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Ingrese el código" className="flex-1 px-3 py-2 rounded-lg bg-[#F2E7E1] text-sm outline-none" />
              <Boton tipo="secundario" onClick={applyCodigo} className="px-4 py-2 text-sm text-black-500">Aplicar</Boton>
            </div>
            {codigoError && <p className="text-[12px] text-[#DE4B52] mb-2">{codigoError}</p>}
            {codigoAplicado && <p className="text-[12px] text-green-600 mb-2">Código {codigoAplicado} aplicado — 20% de descuento</p>}

            {/* Botón que abre modal */}
            <button
              onClick={() => setModalPago(true)}
              className="w-full py-3 rounded-full bg-[#D4A574] hover:bg-[#c49060] text-white text-sm font-semibold transition shadow-md mb-3"
            >
              Proceder con pago
            </button>

            <Boton tipo="outline" anchoTotal className="mt-3">
              <Link to="/productos">Continuar comprando</Link>
            </Boton>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center shadow-sm">
                  <CheckCircle size={16} className="text-[#DE4B52]" />
                </div>
                <p className="text-xs text-[#6B5B4E]">Envío gratuito en pedidos superiores a $100</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center shadow-sm">
                  <RefreshCcw size={16} className="text-[#DE4B52]" />
                </div>
                <p className="text-xs text-[#6B5B4E]">Devoluciones fáciles en 30 días</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center shadow-sm">
                  <Shield size={16} className="text-[#DE4B52]" />
                </div>
                <p className="text-xs text-[#6B5B4E]">Compra 100% segura y protegida</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Modales */}
      {modalPago && <ModalPago onClose={() => setModalPago(false)} onSuccess={handleSuccess} />}
      {modalConfirm && <ModalConfirmacion onClose={() => setModalConfirm(false)} />}
    </div>
  );
};

export default Carrito;

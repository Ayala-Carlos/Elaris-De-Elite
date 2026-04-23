import React, { useState } from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado! Nos pondremos en contacto pronto.");
    setForm({ nombre: "", telefono: "", correo: "", mensaje: "" });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Navbar />

      {/* ENCABEZADO */}
      <section className="text-center pt-12 pb-8 px-6">
        <p className="text-[#D4A574] text-sm tracking-widest mb-2">
          Póngase en contacto con nosotros
        </p>
        <h1 className="text-4xl font-bold text-[#6B5B4E] font-serif mb-3">
          Contáctenos
        </h1>
        <p className="text-[#9C8275] text-sm max-w-md mx-auto leading-relaxed">
          Estamos aquí para ayudarle. Envíanos un mensaje y te responderemos lo
          antes posible.
        </p>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* COLUMNA IZQUIERDA — Info de contacto */}
          <div className="flex flex-col gap-4">

            {/* Correo */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ backgroundColor: "#F5EDE6", border: "1px solid #E8D5CA" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#FDECEA" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="#DE4B52" strokeWidth="1.5"/>
                  <path d="M2 8l10 6 10-6" stroke="#DE4B52" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#6B5B4E] text-sm">Correo</p>
                <p className="text-[#9C8275] text-sm">elarisdeelite@gmail.com</p>
              </div>
            </div>

            {/* Teléfono */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ backgroundColor: "#F5EDE6", border: "1px solid #E8D5CA" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#FDECEA" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6.5 2h11a1 1 0 011 1v18a1 1 0 01-1 1h-11a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#DE4B52" strokeWidth="1.5"/>
                  <circle cx="12" cy="19" r="1" fill="#DE4B52"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#6B5B4E] text-sm">Teléfono</p>
                <p className="text-[#9C8275] text-sm">(+503) 6035-6077</p>
                <p className="text-[#9C8275] text-sm">(+503) 7119-1709</p>
              </div>
            </div>

            {/* Ubicación */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ backgroundColor: "#F5EDE6", border: "1px solid #E8D5CA" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#FDECEA" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="3" stroke="#DE4B52" strokeWidth="1.5"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#DE4B52" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#6B5B4E] text-sm">Ubicación</p>
                <p className="text-[#9C8275] text-sm">La Libertad,</p>
                <p className="text-[#9C8275] text-sm">Antiguo Cuscatlán</p>
              </div>
            </div>

            {/* Síguenos */}
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: "#9C8275" }}
            >
              <p className="font-semibold text-white text-sm mb-1">Síguenos</p>
              <p className="text-[#E8D5CA] text-xs mb-4 leading-relaxed">
                Conéctate con nosotros en redes sociales para conocer las últimas novedades y promociones
              </p>
              <div className="flex gap-3">
                {/* X / Twitter */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A6560" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A6560" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A6560" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA — Formulario */}
          <div
            className="p-7 rounded-2xl"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8D5CA" }}
          >
            <h2 className="text-lg font-semibold text-[#6B5B4E] mb-1">
              Envíanos un mensaje
            </h2>
            <p className="text-xs text-[#9C8275] mb-5">
              Completa el formulario y nos pondremos en contacto en un plazo de 24-48 horas.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Nombre */}
              <div>
                <label className="block text-xs text-[#6B5B4E] mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg text-sm text-[#6B5B4E] outline-none"
                  style={{
                    backgroundColor: "#FAF8F5",
                    border: "1px solid #E8D5CA",
                  }}
                />
              </div>

              {/* Teléfono + Correo */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#6B5B4E] mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg text-sm text-[#6B5B4E] outline-none"
                    style={{
                      backgroundColor: "#FAF8F5",
                      border: "1px solid #E8D5CA",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B5B4E] mb-1">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg text-sm text-[#6B5B4E] outline-none"
                    style={{
                      backgroundColor: "#FAF8F5",
                      border: "1px solid #E8D5CA",
                    }}
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-xs text-[#6B5B4E] mb-1">Mensaje</label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg text-sm text-[#6B5B4E] outline-none resize-none"
                  style={{
                    backgroundColor: "#FAF8F5",
                    border: "1px solid #E8D5CA",
                  }}
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#D4A574" }}
              >
                Enviar
              </button>

              <p className="text-xs text-center text-[#9C8275]">
                Al enviar el mensaje, aceptas nuestra{" "}
                <span className="text-[#D4A574] cursor-pointer hover:underline">
                  Política y privacidad
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
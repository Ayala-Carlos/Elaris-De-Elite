import React, { useState } from "react";
import { Link } from "react-router-dom";
import { contactService } from "../services/contactService.js";

const FormularioContacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarTelefono = (telefono) => /^[0-9+\-\s]{7,15}$/.test(telefono);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: null });
    setExito(false);
  };

  const validarForm = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "El nombre es requerido";

    if (!form.correo.trim()) errs.correo = "El correo es requerido";
    else if (!validarEmail(form.correo.trim())) errs.correo = "Ingresa un correo válido";

    if (form.telefono.trim() && !validarTelefono(form.telefono.trim())) {
      errs.telefono = "Ingresa un teléfono válido";
    }

    if (!form.mensaje.trim()) errs.mensaje = "El mensaje es requerido";
    else if (form.mensaje.trim().length < 10) errs.mensaje = "El mensaje debe tener al menos 10 caracteres";

    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validarForm()) return;
    setEnviando(true);
    try {
      await contactService.send(form);
      setExito(true);
      setForm({ nombre: "", telefono: "", correo: "", mensaje: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div
      className="p-11 rounded-2xl flex flex-col"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8D5CA" }}
    >
      <h2 className="text-lg font-semibold text-[#6B5B4E] mb-1">
        Envíanos un mensaje
      </h2>

      <p className="text-xs text-[#9C8275] mb-5">
        Completa el formulario y nos pondremos en contacto en un plazo de 24-48 horas.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ backgroundColor: "#FAF8F5", border: `1px solid ${errores.nombre ? "#DE4B52" : "#E8D5CA"}` }}
          />
          {errores.nombre && <p className="text-[11px] text-[#DE4B52] mt-1">{errores.nombre}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "#FAF8F5", border: `1px solid ${errores.telefono ? "#DE4B52" : "#E8D5CA"}` }}
            />
            {errores.telefono && <p className="text-[11px] text-[#DE4B52] mt-1">{errores.telefono}</p>}
          </div>

          <div>
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "#FAF8F5", border: `1px solid ${errores.correo ? "#DE4B52" : "#E8D5CA"}` }}
            />
            {errores.correo && <p className="text-[11px] text-[#DE4B52] mt-1">{errores.correo}</p>}
          </div>
        </div>

        <div>
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={form.mensaje}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
            style={{ backgroundColor: "#FAF8F5", border: `1px solid ${errores.mensaje ? "#DE4B52" : "#E8D5CA"}` }}
          />
          {errores.mensaje && <p className="text-[11px] text-[#DE4B52] mt-1">{errores.mensaje}</p>}
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
        {exito && <p className="text-xs text-green-600">¡Mensaje enviado! Nos pondremos en contacto pronto.</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50"
          style={{ backgroundColor: "#D4A574" }}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>

        <p className="text-xs text-center text-[#9C8275]">
          Al enviar el mensaje, aceptas nuestra{" "}
          <Link to="/terminosycondiciones" className="text-[#D4A574] hover:underline">
            Política y privacidad
          </Link>
        </p>
      </form>
    </div>
  );
};

export default FormularioContacto;
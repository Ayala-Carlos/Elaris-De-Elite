import React, { useState } from "react";
import { Link } from "react-router-dom";

const FormularioContacto = () => {
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{ backgroundColor: "#FAF8F5", border: "1px solid #E8D5CA" }}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ backgroundColor: "#FAF8F5", border: "1px solid #E8D5CA" }}
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ backgroundColor: "#FAF8F5", border: "1px solid #E8D5CA" }}
          />
        </div>

        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
          rows={5}
          className="px-3 py-2 rounded-lg text-sm outline-none resize-none"
          style={{ backgroundColor: "#FAF8F5", border: "1px solid #E8D5CA" }}
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold text-sm"
          style={{ backgroundColor: "#D4A574" }}
        >
          Enviar
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
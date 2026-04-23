import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Boton from "../components/Boton.jsx";
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle, RefreshCcw, Shield,} from "lucide-react";
import LabialDior from "../img/LabialDior.png";
import SetBrochas from "../img/SetBrochas.png";
import { Link } from "react-router-dom";

const productos = [
  {
    id: 1,
    categoria: "ACCESORIOS",
    nombre: "Set de brochas",
    precio: 150,
    cantidad: 1,
    img: SetBrochas,
  },
  {
    id: 2,
    categoria: "LABIALES",
    nombre: "Dior Addict barra de labios brillante hidratante",
    precio: 52,
    cantidad: 1,
    img: LabialDior,
  },
];

const Carrito = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto w-full">

        {/* Volver */}
        <div className="flex items-center gap-2 text-sm text-[#D4A574] mb-6">
          <Link to="/productos" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Continuar comprando
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#6B5B4E]">
              Carrito de compras
            </h1>
            <p className="text-xs text-gray-400">
              2 artículos en el carrito
            </p>
          </div>

          <button className="flex items-center gap-2 text-[#DE4B52] text-sm font-semibold">
            <Trash2 size={16} />
            Vaciar carrito
          </button>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/*  PRODUCTOS */}
          <div className="lg:col-span-2 space-y-4">

            {productos.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#E8D5CA]"
              >

                {/* Imagen */}
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="w-full sm:w-28 h-40 sm:h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <p className="text-xs text-[#D4A574] font-semibold mb-1">
                      {p.categoria}
                    </p>

                    <h3 className="text-sm sm:text-base font-semibold text-[#6B5B4E] mb-3">
                      {p.nombre}
                    </h3>
                  </div>

                  {/* Controles */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                    {/* Cantidad */}
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full border border-[#E8D5CA] flex items-center justify-center">
                        <Minus size={14} />
                      </button>

                      <span className="text-sm font-semibold text-[#6B5B4E]">
                        {p.cantidad}
                      </span>

                      <button className="w-8 h-8 rounded-full border border-[#E8D5CA] flex items-center justify-center">
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Precio */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <p className="font-semibold text-[#6B5B4E]">
                        ${p.precio.toFixed(2)}
                      </p>

                      <Trash2
                        size={16}
                        className="text-[#DE4B52] cursor-pointer"
                      />
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>

          {/*  RESUMEN */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-[#E8D5CA] h-fit">

            <h2 className="text-lg font-bold text-[#6B5B4E] mb-4">
              Resumen del pedido
            </h2>

            {/* Totales */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$235.00</span>
              </div>

              <div className="flex justify-between">
                <span>Envío</span>
                <span>Gratis</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>IVA</span>
                <span>$37.60</span>
              </div>

              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>$272.60</span>
              </div>
            </div>

            {/* Código */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                placeholder="Código"
                className="flex-1 px-3 py-2 rounded-lg bg-[#F2E7E1] text-sm outline-none"
              />
              <Boton tipo="secundario" className="px-4 py-2 text-sm">
                Aplicar
              </Boton>
            </div>

            {/* Botones */}
            <Boton tipo="primario" anchoTotal className="py-2">
              Proceder al pago
            </Boton>

            <Boton tipo="outline" anchoTotal className="mt-3">
              <Link to="/productos">Continuar comprando</Link>
            </Boton>

            {/* Info */}
            <div className="mt-6 space-y-4">
              <Info icon={<CheckCircle size={16} />} text="Envío gratis > $100" />
              <Info icon={<RefreshCcw size={16} />} text="Devoluciones en 30 días" />
              <Info icon={<Shield size={16} />} text="Pago 100% seguro" />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Info = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center">
      <span className="text-[#DE4B52]">{icon}</span>
    </div>
    <p className="text-xs text-[#6B5B4E]">{text}</p>
  </div>
);

export default Carrito;
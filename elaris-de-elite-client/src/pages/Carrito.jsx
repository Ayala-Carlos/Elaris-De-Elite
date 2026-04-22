import React from "react";
import Navbar from "../components/BarraNavegacion.jsx";
import Footer from "../components/Footer.jsx";
import Boton from "../components/Boton.jsx";
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle, RefreshCcw, Shield } from "lucide-react";
import LabialDior from "../img/LabialDior.png";
import SetBrochas from "../img/SetBrochas.png";
import { Link } from "react-router-dom";

// Paleta
const C = {
    rojo: "#DE4B52",
    dorado: "#D4A574",
    marron: "#6B5B4E",
    fondo: "#FAF8F5",
    crema: "#F2E7E1",
};

// Mock productos
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

            <main className="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto w-full">

                {/* Volver */}
                <div className="flex items-center gap-2 text-sm text-[#D4A574] cursor-pointer mb-6">
                    <Link to="/productos">
                        <ArrowLeft size={16} />
                    </Link>
                    <Link to="/productos">
                        Continuar comprando
                    </Link>
                </div>

                {/* Título */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#6B5B4E]">
                            Carrito de compras
                        </h1>
                        <p className="text-xs text-gray-400">
                            2 artículos en el carrito
                        </p>
                    </div>

                    <button className="flex items-center gap-2 text-[#DE4B52] text-sm font-semibold">
                        <Trash2 size={16} />
                        Vaciar carrito de compras
                    </button>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* 🛒 LISTA PRODUCTOS */}
                    <div className="md:col-span-2 space-y-6">

                        {productos.map((p) => (
                            <div
                                key={p.id}
                                className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#E8D5CA]"
                            >

                                {/* Imagen */}
                                <img
                                    src={p.img}
                                    alt={p.nombre}
                                    className="w-28 h-24 object-cover rounded-lg"
                                />

                                {/* Info */}
                                <div className="flex-1">
                                    <p className="text-xs text-[#D4A574] font-semibold mb-1">
                                        {p.categoria}
                                    </p>

                                    <h3 className="text-sm font-semibold text-[#6B5B4E] mb-3">
                                        {p.nombre}
                                    </h3>

                                    {/* Controles */}
                                    <div className="flex items-center justify-between">

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

                                        {/* Precio + delete */}
                                        <div className="flex items-center gap-4">
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

                    {/* 💳 RESUMEN */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5CA] h-fit">

                        <h2 className="text-lg font-bold text-[#6B5B4E] mb-4">
                            Resumen del pedido
                        </h2>

                        {/* Totales */}
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between text-[#6B5B4E]">
                                <span>Subtotal</span>
                                <span>$235.00</span>
                            </div>

                            <div className="flex justify-between text-[#6B5B4E]">
                                <span>Envío</span>
                                <span>Gratis</span>
                            </div>

                            <div className="flex justify-between text-[#6B5B4E] border-b pb-2">
                                <span>IVA (16%)</span>
                                <span>$37.60</span>
                            </div>

                            <div className="flex justify-between font-bold text-[#6B5B4E] pt-2">
                                <span>Total</span>
                                <span>$272.60</span>
                            </div>
                        </div>

                        {/* Código */}
                        <div className="flex gap-2 mb-4">
                            <input
                                placeholder="Ingrese el código"
                                className="flex-1 px-3 py-2 rounded-lg bg-[#F2E7E1] text-sm outline-none"
                            />
                            <Boton tipo="secundario" className="px-4 py-2 text-sm text-black-500">
                                Aplicar
                            </Boton>
                        </div>

                        {/* Botones */}
                        <Boton tipo="primario" anchoTotal className="px-2 py-2 text-1xl">
                            Proceder con pago
                        </Boton>

                        <Boton tipo="outline" anchoTotal className="mt-3 ">
                            <Link to="/productos">
                                Continuar comprando
                            </Link>
                        </Boton>

                        {/* Info extra */}
                        <div className="mt-6 space-y-4">

                            {/* Envío */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center shadow-sm">
                                    <CheckCircle size={16} className="text-[#DE4B52]" />
                                </div>
                                <p className="text-xs text-[#6B5B4E]">
                                    Envío gratuito en pedidos superiores a $100
                                </p>
                            </div>

                            {/* Devoluciones */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center shadow-sm">
                                    <RefreshCcw size={16} className="text-[#DE4B52]" />
                                </div>
                                <p className="text-xs text-[#6B5B4E]">
                                    Devoluciones fáciles en 30 días
                                </p>
                            </div>

                            {/* Seguridad */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#FDECEC] flex items-center justify-center shadow-sm">
                                    <Shield size={16} className="text-[#DE4B52]" />
                                </div>
                                <p className="text-xs text-[#6B5B4E]">
                                    Compra 100% segura y protegida
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Carrito;
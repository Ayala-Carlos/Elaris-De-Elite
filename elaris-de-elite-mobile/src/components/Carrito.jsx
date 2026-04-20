import React, { useState } from 'react';
import ItemCarrito from '../componentes/ItemCarrito';
import Boton from '../componentes/Boton';
import { ShoppingCartIcon, HomeIcon, UserIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Datos de ejemplo
const itemsIniciales = [
  {
    id: 1,
    marca: "Labiales",
    nombre: "Runway Matte Lipstick Color with Hydrating, 12H Longwear",
    especificacion: "",
    imagen: "url-de-tu-imagen-labial.png", // Reemplaza con una URL real
    precio: 62.00,
    cantidad: 1,
  },
  {
    id: 2,
    marca: "Rubores",
    nombre: "Double-Take Crème & Powder Blush Duo",
    especificacion: "",
    imagen: "url-de-tu-imagen-rubor.png", // Reemplaza con una URL real
    precio: 40.00,
    cantidad: 1,
  },
];

const Carrito = () => {
  const [items, setItems] = useState(itemsIniciales);

  // Función para eliminar un item (simple)
  const eliminarItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Cálculos del resumen
  const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const iva = subtotal * 0.16; // Asumiendo 16% de IVA
  const envio = subtotal > 100 ? 0 : 10; // Envío gratis sobre $100
  const total = subtotal + iva + envio;

  return (
    <div className="bg-[#F6F6F6] min-h-screen flex flex-col font-base text-[#5B4D42]">
      
      {/* --- HEADER --- */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
        <img src="url-de-tu-logo.png" alt="Logo ÉlARIS DE ÉLITE" className="h-8" />
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <ShoppingCartIcon className="h-6 w-6 text-gray-400" />
          <Bars3Icon className="h-6 w-6 text-gray-400" />
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-grow p-6 space-y-8 mb-28">
        <a href="#" className="text-sm text-gray-500 hover:text-[#D4A373]">← volver a inicio</a>
        
        <h1 className="text-2xl font-bold text-gray-900">Carrito de compras</h1>

        {/* Sección de Items */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Resumen de compra</h2>
          {items.map(item => (
            <ItemCarrito key={item.id} item={item} onEliminar={eliminarItem} />
          ))}
        </section>

        {/* Sección de Resumen del Pedido */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="text-lg font-bold text-gray-900">Resumen de pedido</h2>
          <div className="space-y-2.5">
            <FilaResumen etiqueta="Subtotal" valor={subtotal} />
            <FilaResumen etiqueta="Envío" valor={envio === 0 ? "Gratis" : envio} />
            <FilaResumen etiqueta="IVA (16%)" valor={iva} />
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="font-bold text-base text-gray-900">Total</span>
              <span className="font-bold text-2xl text-[#D4A373]">${total.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Código de descuento */}
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ingrese el código" 
              className="flex-grow border-2 border-[#EAE6DF] px-4 py-2.5 rounded-lg focus:border-[#D4A373] outline-none"
            />
            <Boton tipo="secundario" className="px-5 py-2 text-sm">Aplicar</Boton>
          </div>
          
          {/* Botones de Acción */}
          <div className="space-y-3 pt-4">
            <Boton tipo="primario" anchoTotal>Proceder con pago</Boton>
            <Boton tipo="outline" anchoTotal>Continuar comprando</Boton>
          </div>
        </section>

        {/* Sección de Beneficios (Iconos) */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFEFEF] p-2 rounded-full">
              <span className="text-red-500">✓</span>
            </div>
            <p className="text-sm text-gray-700">Envío gratuito en pedidos superiores a $100</p>
          </div>
          {/* ...agrega los otros dos beneficios aquí... */}
        </section>
      </main>

      {/* --- BARRA DE NAVEGACIÓN INFERIOR --- */}
      <footer className="bg-white fixed bottom-0 left-0 right-0 p-4 border-t border-gray-100 flex justify-around items-center z-50">
        <ShoppingCartIcon className="h-7 w-7 text-gray-400" />
        <HomeIcon className="h-7 w-7 text-[#D4A373]" /> {/* Color de marca para el activo */}
        <UserIcon className="h-7 w-7 text-gray-400" />
      </footer>
    </div>
  );
};

// Componente helper para las filas del resumen
const FilaResumen = ({ etiqueta, valor }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600">{etiqueta}</span>
    <span className="font-semibold text-gray-800">
      {typeof valor === 'number' ? `$${valor.toFixed(2)}` : valor}
    </span >
  </div >
);

export default Carrito;
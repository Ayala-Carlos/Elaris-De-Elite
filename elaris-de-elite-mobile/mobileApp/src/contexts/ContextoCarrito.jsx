import { createContext, useCallback, useEffect, useState } from "react";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { servicioCarrito } from "../services/servicioCarrito.js";

export const ContextoCarrito = createContext(null);

// Convierte los productos del carrito guardado en el backend al formato
// mínimo que espera el endpoint de actualizar/crear carrito.
const aListaParaGuardar = (productos = []) =>
  productos.map((p) => ({
    productId: p.productId?._id || p.productId,
    quantity: p.quantity,
  }));

// Provee el carrito de compras del cliente autenticado a toda la app:
// lo carga al iniciar sesión y expone acciones para agregar, actualizar
// y quitar productos, guardando siempre en el backend (/api/cart).
export const ProveedorCarrito = ({ children }) => {
  const { cliente } = useAutenticacion();
  const [carrito, setCarrito] = useState(null);
  const [cargando, setCargando] = useState(false);

  const cargarCarrito = useCallback(async (idCliente) => {
    setCargando(true);
    try {
      const encontrado = await servicioCarrito.obtenerPorCliente(idCliente);
      setCarrito(encontrado || null);
    } catch (error) {
      console.log("No se pudo cargar el carrito:", error);
      setCarrito(null);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (cliente?._id) {
      cargarCarrito(cliente._id);
    } else {
      setCarrito(null);
    }
  }, [cliente?._id, cargarCarrito]);

  const guardarCarrito = useCallback(
    async (productos) => {
      if (!cliente?._id) {
        throw new Error("Debes iniciar sesión para modificar el carrito");
      }

      if (productos.length === 0) {
        if (carrito?._id) await servicioCarrito.eliminar(carrito._id);
        setCarrito(null);
        return;
      }

      setCargando(true);
      try {
        const datos = {
          customerId: cliente._id,
          products: productos,
          lastUpdated: new Date().toISOString(),
          discountAmount: 0,
          loyaltyPointsUsed: 0,
        };

        if (carrito?._id) {
          await servicioCarrito.actualizar(carrito._id, datos);
          const actualizado = await servicioCarrito.obtenerPorId(carrito._id);
          setCarrito(actualizado);
        } else {
          await servicioCarrito.crear(datos);
          const creado = await servicioCarrito.obtenerPorCliente(cliente._id);
          setCarrito(creado);
        }
      } finally {
        setCargando(false);
      }
    },
    [cliente?._id, carrito?._id],
  );

  const agregarProducto = useCallback(
    async (idProducto, cantidad = 1) => {
      const actuales = aListaParaGuardar(carrito?.products || []);
      const existente = actuales.find((p) => p.productId === idProducto);
      const siguiente = existente
        ? actuales.map((p) =>
            p.productId === idProducto ? { ...p, quantity: p.quantity + cantidad } : p,
          )
        : [...actuales, { productId: idProducto, quantity: cantidad }];
      await guardarCarrito(siguiente);
    },
    [carrito, guardarCarrito],
  );

  const eliminarProducto = useCallback(
    async (idProducto) => {
      const siguiente = aListaParaGuardar(carrito?.products || []).filter(
        (p) => p.productId !== idProducto,
      );
      await guardarCarrito(siguiente);
    },
    [carrito, guardarCarrito],
  );

  const actualizarCantidad = useCallback(
    async (idProducto, cantidad) => {
      if (cantidad <= 0) {
        await eliminarProducto(idProducto);
        return;
      }
      const siguiente = aListaParaGuardar(carrito?.products || []).map((p) =>
        p.productId === idProducto ? { ...p, quantity: cantidad } : p,
      );
      await guardarCarrito(siguiente);
    },
    [carrito, guardarCarrito, eliminarProducto],
  );

  const vaciarCarrito = useCallback(async () => {
    if (carrito?._id) {
      await servicioCarrito.eliminar(carrito._id);
    }
    setCarrito(null);
  }, [carrito]);

  const productos = carrito?.products || [];
  const cantidadTotal = productos.reduce((suma, p) => suma + p.quantity, 0);
  const subtotal = productos.reduce((suma, p) => suma + (p.subtotal || 0), 0);
  const total = Number(carrito?.totalAmount) || subtotal;

  return (
    <ContextoCarrito.Provider
      value={{
        carrito,
        productos,
        cantidadTotal,
        subtotal,
        total,
        cargando,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
        recargar: () => cliente?._id && cargarCarrito(cliente._id),
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};

export default ContextoCarrito;

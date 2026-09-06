import { createContext, useCallback, useEffect, useState } from "react";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { servicioCarrito } from "../services/servicioCarrito.js";
import { servicioCodigosDescuento } from "../services/servicioCodigosDescuento.js";
import { servicioOrdenes } from "../services/servicioOrdenes.js";

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
// y quitar productos, aplicar un código de descuento y pagar,
// guardando siempre en el backend (/api/cart y /api/orders).
export const ProveedorCarrito = ({ children }) => {
  const { cliente } = useAutenticacion();
  const [carrito, setCarrito] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [codigoDescuento, setCodigoDescuento] = useState(null);
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);

  const cargarCarrito = useCallback(async (idCliente) => {
    setCargando(true);
    try {
      const encontrado = await servicioCarrito.obtenerPorCliente(idCliente);
      setCarrito(encontrado || null);

      // El carrito solo guarda el descuento como un monto en dólares, no como
      // el porcentaje original, así que se reconstruye aquí para no perder
      // el descuento aplicado en el siguiente guardado.
      const montoDescuento = Number(encontrado?.discountAmount) || 0;
      if (encontrado && montoDescuento > 0) {
        const totalAntesDelDescuento = (Number(encontrado.totalAmount) || 0) + montoDescuento;
        const porcentaje =
          totalAntesDelDescuento > 0
            ? Math.round((montoDescuento / totalAntesDelDescuento) * 100)
            : 0;
        setPorcentajeDescuento(porcentaje);
      } else {
        setPorcentajeDescuento(0);
        setCodigoDescuento(null);
      }
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
      setCodigoDescuento(null);
      setPorcentajeDescuento(0);
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
        setCodigoDescuento(null);
        setPorcentajeDescuento(0);
        return;
      }

      setCargando(true);
      try {
        const datos = {
          customerId: cliente._id,
          products: productos,
          lastUpdated: new Date().toISOString(),
          discountAmount: porcentajeDescuento,
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
    [cliente?._id, carrito?._id, porcentajeDescuento],
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
    setCodigoDescuento(null);
    setPorcentajeDescuento(0);
  }, [carrito]);

  // Busca el código en el backend y, si es válido, lo aplica guardando el
  // carrito con el nuevo porcentaje de descuento.
  const aplicarCodigoDescuento = useCallback(
    async (codigo) => {
      const encontrado = await servicioCodigosDescuento.buscarPorCodigo(codigo);
      setCodigoDescuento(encontrado.code);
      setPorcentajeDescuento(encontrado.discountPercentage);

      if (carrito?.products?.length) {
        setCargando(true);
        try {
          const datos = {
            customerId: cliente._id,
            products: aListaParaGuardar(carrito.products),
            lastUpdated: new Date().toISOString(),
            discountAmount: encontrado.discountPercentage,
            loyaltyPointsUsed: 0,
          };
          await servicioCarrito.actualizar(carrito._id, datos);
          const actualizado = await servicioCarrito.obtenerPorId(carrito._id);
          setCarrito(actualizado);
        } finally {
          setCargando(false);
        }
      }

      return encontrado;
    },
    [carrito, cliente?._id],
  );

  // Crea el pedido a partir del carrito actual y lo marca como completado
  // (no se elimina, porque el pedido guarda una referencia a él).
  const pagarPedido = useCallback(
    async (direccion) => {
      if (!carrito?._id || !carrito.products?.length) {
        throw new Error("El carrito está vacío");
      }

      await servicioOrdenes.crear({
        cartId: carrito._id,
        address: [direccion],
        orderStatus: "pending",
        orderDate: new Date().toISOString(),
        payment: [
          {
            paymentMethod: "card",
            paymentStatus: "paid",
            paymentDate: new Date().toISOString(),
          },
        ],
      });

      await servicioCarrito.actualizar(carrito._id, {
        customerId: cliente._id,
        products: aListaParaGuardar(carrito.products),
        lastUpdated: new Date().toISOString(),
        discountAmount: porcentajeDescuento,
        loyaltyPointsUsed: 0,
        status: "completed",
      });

      setCarrito(null);
      setCodigoDescuento(null);
      setPorcentajeDescuento(0);
    },
    [carrito, cliente?._id, porcentajeDescuento],
  );

  const productos = carrito?.products || [];
  const cantidadTotal = productos.reduce((suma, p) => suma + p.quantity, 0);
  const subtotal = productos.reduce((suma, p) => suma + (p.subtotal || 0), 0);
  const montoDescuento = Number(carrito?.discountAmount) || 0;
  const total = Number(carrito?.totalAmount) || subtotal;

  return (
    <ContextoCarrito.Provider
      value={{
        carrito,
        productos,
        cantidadTotal,
        subtotal,
        montoDescuento,
        total,
        codigoDescuento,
        porcentajeDescuento,
        cargando,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
        aplicarCodigoDescuento,
        pagarPedido,
        recargar: () => cliente?._id && cargarCarrito(cliente._id),
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};

export default ContextoCarrito;

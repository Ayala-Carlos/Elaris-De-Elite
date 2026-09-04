import { useCallback, useEffect, useState } from "react";
import { servicioProductos } from "../services/servicioProductos.js";

// Adapta un producto del backend (en inglés) a un formato en español,
// listo para mostrarse en las pantallas.
const adaptarProducto = (p) => ({
  id: p._id,
  nombre: p.name,
  precio: p.price,
  categoria: (p.idCategory?.name || "SIN CATEGORÍA").toUpperCase(),
  imagen: p.images?.[0]?.image,
  stock: p.stock,
  creadoEn: p.createdAt,
  original: p,
});

// Trae y adapta la lista completa de productos desde el backend.
export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = useCallback(() => {
    setCargando(true);
    setError(null);
    return servicioProductos
      .obtenerTodos()
      .then((datos) => setProductos((datos || []).map(adaptarProducto)))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    let activo = true;
    cargarProductos().catch(() => {
      if (!activo) return;
    });
    return () => {
      activo = false;
    };
  }, [cargarProductos]);

  const categorias = ["TODOS", ...new Set(productos.map((p) => p.categoria))];

  return { productos, categorias, cargando, error, recargar: cargarProductos };
};

export default useProductos;

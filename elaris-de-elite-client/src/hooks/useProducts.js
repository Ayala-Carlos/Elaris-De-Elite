import { useEffect, useState } from "react";
import { productsService } from "../services/productsService.js";

export const adaptProduct = (p) => ({
  id: p._id,
  nombre: p.name,
  precio: p.price,
  categoria: (p.idCategory?.name || "SIN CATEGORÍA").toUpperCase(),
  img: p.images?.[0]?.image,
  stock: p.stock,
  createdAt: p.createdAt,
  raw: p,
});

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    productsService
      .getAll()
      .then((data) => {
        if (active) setProducts((data || []).map(adaptProduct));
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = ["TODOS", ...new Set(products.map((p) => p.categoria))];

  return { products, categories, loading, error };
};

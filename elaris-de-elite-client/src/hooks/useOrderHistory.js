import { useEffect, useState } from "react";
import { ordersService } from "../services/ordersService.js";

export const useOrderHistory = (customerId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);

    ordersService
      .getByCustomer(customerId)
      .then((data) => {
        if (active) setOrders(data || []);
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
  }, [customerId]);

  return { orders, loading, error };
};

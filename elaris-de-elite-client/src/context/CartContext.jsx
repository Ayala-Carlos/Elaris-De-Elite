import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { cartService } from "../services/cartService.js";
import { ordersService } from "../services/ordersService.js";
import { discountCodesService } from "../services/discountCodesService.js";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [discountCode, setDiscountCode] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCart(user._id);
    } else {
      setCart(null);
      setDiscountCode(null);
      setDiscountPercent(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const loadCart = async (customerId) => {
    setLoading(true);
    try {
      const found = await cartService.getByCustomer(customerId);
      setCart(found || null);

      // The cart only stores the discount as a dollar amount, not the original percentage,
      // so it's reconstructed here to avoid wiping out an applied discount on the next save.
      const discountDollars = Number(found?.discountAmount) || 0;
      if (found && discountDollars > 0) {
        const preDiscountTotal = (Number(found.totalAmount) || 0) + discountDollars;
        const percent = preDiscountTotal > 0 ? Math.round((discountDollars / preDiscountTotal) * 100) : 0;
        setDiscountPercent(percent);
        setDiscountCode(null);
      } else {
        setDiscountPercent(0);
        setDiscountCode(null);
      }
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const itemsPayload = (products) =>
    products.map((p) => ({
      productId: p.productId?._id || p.productId,
      quantity: p.quantity,
    }));

  const saveCart = async (products) => {
    if (!user) throw new Error("Debes iniciar sesión para modificar el carrito");

    if (products.length === 0) {
      await clearCart();
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customerId: user._id,
        products,
        lastUpdated: new Date().toISOString(),
        discountAmount: discountPercent,
        loyaltyPointsUsed: 0,
      };

      if (cart?._id) {
        await cartService.update(cart._id, payload);
        const fresh = await cartService.getById(cart._id);
        setCart(fresh);
      } else {
        await cartService.create(payload);
        const fresh = await cartService.getByCustomer(user._id);
        setCart(fresh);
      }
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    const current = cart?.products ? itemsPayload(cart.products) : [];
    const existing = current.find((p) => p.productId === productId);
    const next = existing
      ? current.map((p) => (p.productId === productId ? { ...p, quantity: p.quantity + quantity } : p))
      : [...current, { productId, quantity }];
    await saveCart(next);
  };

  const updateItemQty = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }
    const current = itemsPayload(cart?.products || []);
    const next = current.map((p) => (p.productId === productId ? { ...p, quantity } : p));
    await saveCart(next);
  };

  const removeItem = async (productId) => {
    const current = itemsPayload(cart?.products || []);
    const next = current.filter((p) => p.productId !== productId);
    await saveCart(next);
  };

  const clearCart = async () => {
    if (cart?._id) {
      await cartService.remove(cart._id);
    }
    setCart(null);
    setDiscountCode(null);
    setDiscountPercent(0);
  };

  const applyDiscountCode = async (code) => {
    const found = await discountCodesService.searchByCode(code);
    setDiscountCode(found.code);
    setDiscountPercent(found.discountPercentage);

    if (cart?.products?.length) {
      setLoading(true);
      try {
        const payload = {
          customerId: user._id,
          products: itemsPayload(cart.products),
          lastUpdated: new Date().toISOString(),
          discountAmount: found.discountPercentage,
          loyaltyPointsUsed: 0,
        };
        await cartService.update(cart._id, payload);
        const fresh = await cartService.getById(cart._id);
        setCart(fresh);
      } finally {
        setLoading(false);
      }
    }

    return found;
  };

  const checkout = async (address) => {
    if (!cart?._id || !cart.products?.length) {
      throw new Error("El carrito está vacío");
    }

    const summary = {
      products: cart.products,
      subtotal: cart.products.reduce((s, p) => s + (p.subtotal || 0), 0),
      discountAmount: Number(cart.discountAmount) || 0,
      totalAmount: Number(cart.totalAmount) || 0,
    };

    await ordersService.create({
      cartId: cart._id,
      address: [address],
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

    // Mark the cart as completed instead of deleting it, since the order keeps a
    // reference to it (deleting would break the admin's order/cart lookups).
    await cartService.update(cart._id, {
      customerId: user._id,
      products: itemsPayload(cart.products),
      lastUpdated: new Date().toISOString(),
      discountAmount: discountPercent,
      loyaltyPointsUsed: 0,
      status: "completed",
    });

    setCart(null);
    setDiscountCode(null);
    setDiscountPercent(0);

    return summary;
  };

  const items = cart?.products || [];
  const itemCount = items.reduce((s, p) => s + p.quantity, 0);
  const subtotal = items.reduce((s, p) => s + (p.subtotal || 0), 0);
  const totalAmount = Number(cart?.totalAmount) || subtotal;
  const discountValue = Number(cart?.discountAmount) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        itemCount,
        subtotal,
        totalAmount,
        discountValue,
        discountCode,
        discountPercent,
        loading,
        addItem,
        updateItemQty,
        removeItem,
        clearCart,
        applyDiscountCode,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

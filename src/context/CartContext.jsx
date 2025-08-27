import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        const prevQty = copy[idx].quantity ?? 0;
        const max = item.stock ?? Infinity;
        copy[idx] = {
          ...copy[idx],
          quantity: Math.min(prevQty + qty, max),
        };
        return copy;
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeById = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const resetCart = () => setCart([]);

  const getTotalAmount = () =>
    cart.reduce((acc, p) => acc + (Number(p.price) || 0) * (p.quantity || 0), 0);

  const getTotalQuanty = () =>
    cart.reduce((acc, p) => acc + (p.quantity || 0), 0);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeById,
      resetCart,
      getTotalAmount,
      getTotalQuanty,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

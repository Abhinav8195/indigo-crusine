import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);
const CART_KEY = "indigo_cart";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpenedRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const getUniqueId = (item) => item.variantName ? `${item.name} - ${item.variantName}` : item.name;

  const addItem = (item) => {
    setItems((prev) => {
      const uniqueId = getUniqueId(item);
      const existing = prev.find((i) => getUniqueId(i) === uniqueId);
      if (existing) {
        return prev.map((i) =>
          getUniqueId(i) === uniqueId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { name: item.name, variantName: item.variantName, price: parseFloat(item.price), qty: 1 }];
    });
    if (!hasAutoOpenedRef.current) {
      setIsOpen(true);
      hasAutoOpenedRef.current = true;
    } else {
      toast.success(`${item.variantName ? `${item.name} (${item.variantName})` : item.name} added to cart`, {
        action: { label: "View cart", onClick: () => setIsOpen(true) },
      });
    }
  };

  const updateQty = (uniqueId, qty) => {
    if (qty <= 0) return removeItem(uniqueId);
    setItems((prev) => prev.map((i) => (getUniqueId(i) === uniqueId ? { ...i, qty } : i)));
  };

  const removeItem = (uniqueId) => {
    setItems((prev) => prev.filter((i) => getUniqueId(i) !== uniqueId));
  };

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clear, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

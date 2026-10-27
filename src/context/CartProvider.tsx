import { useState, type ReactNode } from "react";
import { CartContext, type CartItem } from "./cartContext";
import type { Product } from "../types/product";
import { getEffectivePrice } from "../utils/productPricing";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    setItems((current) => {
      const found = current.find(
        (item) => String(item.product.id) === String(product.id),
      );
      if (product.stock <= (found?.quantity ?? 0)) {
        return current;
      }
      if (found) {
        return current.map((item) =>
          String(item.product.id) === String(product.id)
            ? { ...item, product, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  function removeItem(id: Product["id"]) {
    setItems((current) =>
      current.filter((item) => String(item.product.id) !== String(id)),
    );
  }

  function updateQuantity(id: Product["id"], quantity: number) {
    setItems((current) =>
      current.map((item) => {
        if (String(item.product.id) !== String(id)) return item;
        const clampedQuantity = Math.min(
          item.product.stock,
          Math.max(1, Math.floor(quantity)),
        );
        return { ...item, quantity: clampedQuantity };
      }),
    );
  }

  function getSubtotal(id: Product["id"]) {
    const item = items.find(
      (cartItem) => String(cartItem.product.id) === String(id),
    );
    return item ? getEffectivePrice(item.product) * item.quantity : 0;
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = items.reduce(
    (sum, item) => sum + getEffectivePrice(item.product) * item.quantity,
    0,
  );
  const value = {
    items,
    totalItems,
    totalCents,
    addItem,
    removeItem,
    updateQuantity,
    getSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

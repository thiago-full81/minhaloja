import { createContext } from "react";
import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalCents: number;
  addItem: (product: Product) => void;
  removeItem: (id: Product["id"]) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  getSubtotal: (id: Product["id"]) => number;
}

export const CartContext = createContext<CartContextValue | null>(null);

import type { Product } from "../types/product";

export function getEffectivePrice(product: Product): number {
  const promoPrice = product.promoPrice;
  return promoPrice !== undefined &&
    promoPrice > 0 &&
    promoPrice < product.price
    ? promoPrice
    : product.price;
}

export function hasValidPromotion(product: Product): boolean {
  return getEffectivePrice(product) < product.price;
}

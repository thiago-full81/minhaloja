import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/currency";
import { getEffectivePrice, hasValidPromotion } from "../../utils/productPricing";
import "./styles.css";

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const soldOut = product.stock === 0;
  const promotionalPrice = hasValidPromotion(product)
    ? product.promoPrice
    : undefined;

  return (
    <article className="product-card">
      <Link className="product-card__details" to={`/products/${product.id}`}>
        <div className="product-card__image-wrap">
          <img className="product-card__image" src={product.image} alt={product.name} />
          {soldOut && <span className="product-card__badge">Esgotado</span>}
        </div>
        <div className="product-card__body">
          <span className="product-card__category">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="product-card__prices">
            {promotionalPrice !== undefined && promotionalPrice < product.price && (
              <s>{formatCurrency(product.price)}</s>
            )}
            <strong>
              {formatCurrency(getEffectivePrice(product))}
            </strong>
          </div>
        </div>
      </Link>
      <button
        className="button button--primary product-card__buy"
        disabled={soldOut}
        onClick={() => onBuy(product)}
        type="button"
      >
        {soldOut ? "Indisponível" : "Comprar"}
      </button>
    </article>
  );
}

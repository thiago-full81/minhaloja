import { Link, useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProducts";
import { formatCurrency } from "../../utils/currency";
import { getEffectivePrice, hasValidPromotion } from "../../utils/productPricing";
import { isNotFoundError } from "../../utils/apiErrors";

export default function ProductDetail() {
  const { id = "" } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();

  if (isLoading) {
    return <main className="page-shell"><p className="status-message">Carregando produto…</p></main>;
  }
  if (error || !product) {
    if (error && !isNotFoundError(error)) {
      return <main className="page-shell"><p className="error-message">Não foi possível carregar o produto. Verifique a conexão e tente novamente.</p></main>;
    }
    return <main className="page-shell"><h1>Produto não encontrado</h1></main>;
  }

  const price = getEffectivePrice(product);
  const soldOut = product.stock === 0;

  return (
    <main className="page-shell">
      <Link className="back-link" to="/">← Voltar à loja</Link>
      <article className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-detail__content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {hasValidPromotion(product) && (
            <s className="product-detail__original-price">{formatCurrency(product.price)}</s>
          )}
          <strong className="product-detail__price">{formatCurrency(price)}</strong>
          {soldOut ? (
            <p className="stock-status">Esgotado</p>
          ) : (
            <p className="muted">Em estoque: {product.stock}</p>
          )}
          <button
            className="button button--primary"
            disabled={soldOut}
            onClick={() => addItem(product)}
            type="button"
          >
            {soldOut ? "Indisponível" : "Comprar"}
          </button>
        </div>
      </article>
    </main>
  );
}

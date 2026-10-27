import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";

export default function Home() {
  const { products, isLoading, error, refetch } = useProducts();
  const { addItem } = useCart();

  return (
    <main className="page-shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Feito para cuidar de você</p>
          <h1>Nossa loja</h1>
          <p className="muted">Produtos artesanais para sua rotina.</p>
        </div>
      </header>

      {isLoading ? (
        <p className="status-message" role="status">Carregando produtos…</p>
      ) : error ? (
        <div className="error-panel" role="alert">
          <p>Não foi possível carregar os produtos.</p>
          <button className="button button--primary" onClick={() => void refetch()}>
            Tentar novamente
          </button>
        </div>
      ) : products.length === 0 ? (
        <p className="status-message">Nenhum produto encontrado.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={addItem}
            />
          ))}
        </div>
      )}
      <Link aria-label="Ir para o painel administrativo" className="home-admin-link" to="/admin">
        Painel administrativo
      </Link>
    </main>
  );
}

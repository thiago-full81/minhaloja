import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./styles.css";

export default function Navigation() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/">MinhaLoja</Link>
        <nav aria-label="Navegação principal" className="site-nav">
          <NavLink end to="/">Loja</NavLink>
          <NavLink to="/admin">Administração</NavLink>
        </nav>
        <Link
          aria-label={`Carrinho com ${totalItems} itens`}
          className="site-cart"
          to="/carrinho"
        >
          <span aria-hidden="true">🛒</span>
          <span>Carrinho</span>
          <span aria-live="polite" className="site-cart__count">{totalItems}</span>
        </Link>
      </div>
    </header>
  );
}

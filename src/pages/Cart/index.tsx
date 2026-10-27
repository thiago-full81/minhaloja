import { Link } from "react-router-dom";
import CartSummary from "../../components/CartSummary";
import { useCart } from "../../hooks/useCart";
import { appConfig } from "../../config/appConfig";
import { formatCurrency } from "../../utils/currency";
import { getEffectivePrice } from "../../utils/productPricing";

export default function Cart() {
  const {
    items,
    totalItems,
    totalCents,
    removeItem,
    updateQuantity,
    getSubtotal,
  } = useCart();

  function checkout() {
    const lines = items.map(({ product, quantity }) => {
      const unitPrice = getEffectivePrice(product);
      const subtotal = unitPrice * quantity;
      return `- ${product.name} | ${quantity} un. | ${formatCurrency(unitPrice)} cada | Subtotal: ${formatCurrency(subtotal)}`;
    });
    const message = [
      "Olá! Gostaria de finalizar este pedido:",
      "",
      ...lines,
      "",
      `Total de itens: ${totalItems}`,
      `Total: ${formatCurrency(totalCents)}`,
    ].join("\n");
    const whatsappPhone = appConfig.phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Seus produtos</p>
          <h1>Carrinho</h1>
        </div>
      </div>
      {items.length === 0 ? (
        <section className="empty-state">
          <h2>Seu carrinho está vazio</h2>
          <p className="muted">Explore a loja e escolha seus produtos favoritos.</p>
          <Link className="button button--primary" to="/">Ver produtos</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <ul className="cart-items">
            {items.map(({ product, quantity }) => {
              const unitPrice = getEffectivePrice(product);
              return (
                <li className="cart-item" key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="cart-item__info">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <span className="muted">{formatCurrency(unitPrice)} cada</span>
                    <div className="quantity-control">
                      <button
                        aria-label={`Diminuir quantidade de ${product.name}`}
                        disabled={quantity <= 1}
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        type="button"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        aria-label={`Aumentar quantidade de ${product.name}`}
                        disabled={quantity >= product.stock}
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <strong className="cart-item__subtotal">
                    {formatCurrency(getSubtotal(product.id))}
                  </strong>
                  <button
                    aria-label={`Remover ${product.name}`}
                    className="text-button text-button--danger"
                    onClick={() => removeItem(product.id)}
                    type="button"
                  >
                    Remover
                  </button>
                </li>
              );
            })}
          </ul>
          <CartSummary totalItems={totalItems} totalCents={totalCents}>
            <button className="button button--primary" onClick={checkout} type="button">
              Finalizar pelo WhatsApp
            </button>
          </CartSummary>
        </div>
      )}
    </main>
  );
}

import type { ReactNode } from "react";
import { formatCurrency } from "../../utils/currency";
import "./styles.css";

interface CartSummaryProps {
  totalItems: number;
  totalCents: number;
  children?: ReactNode;
}

export default function CartSummary({
  totalItems,
  totalCents,
  children,
}: CartSummaryProps) {
  return (
    <aside className="cart-summary">
      <h2>Resumo do pedido</h2>
      <p>
        Total de itens <strong>{totalItems}</strong>
      </p>
      <p className="cart-summary__total">
        Total <strong>{formatCurrency(totalCents)}</strong>
      </p>
      {children}
    </aside>
  );
}

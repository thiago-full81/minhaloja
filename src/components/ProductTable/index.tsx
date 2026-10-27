import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/currency";
import { getEffectivePrice } from "../../utils/productPricing";
import "./styles.css";

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="table-scroll">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{formatCurrency(getEffectivePrice(product))}</td>
              <td>
                <span className={product.stock === 0 ? "stock-empty" : ""}>
                  {product.stock}
                </span>
              </td>
              <td className="product-table__actions">
                <Link
                  className="button button--small button--secondary"
                  to={`/admin/${product.id}/editar`}
                >
                  Editar
                </Link>
                <button
                  className="button button--small button--danger"
                  onClick={() => onDelete(product)}
                  type="button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

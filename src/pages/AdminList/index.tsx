import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/product";
import { apiErrorMessage } from "../../utils/apiErrors";

export default function AdminList() {
  const {
    products,
    isLoading,
    error,
    refetch,
    deleteProduct,
    isDeleting,
  } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionError, setActionError] = useState("");

  async function confirmDelete() {
    if (!selectedProduct) return;
    setActionError("");
    try {
      await deleteProduct(String(selectedProduct.id));
      setSelectedProduct(null);
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    }
  }

  return (
    <main className="page-shell">
      <header className="page-heading page-heading--row">
        <div>
          <p className="eyebrow">Gerencie sua loja</p>
          <h1>Produtos</h1>
        </div>
        <Link className="button button--primary" to="/admin/novo">Novo Produto</Link>
      </header>
      {isLoading ? (
        <p className="status-message">Carregando produtos…</p>
      ) : error ? (
        <div className="error-panel" role="alert">
          <p>Não foi possível carregar os produtos.</p>
          <button className="button button--primary" onClick={() => void refetch()}>
            Tentar novamente
          </button>
        </div>
      ) : products.length === 0 ? (
        <p className="status-message">Nenhum produto cadastrado.</p>
      ) : (
        <ProductTable products={products} onDelete={setSelectedProduct} />
      )}
      {actionError && <p className="error-message" role="alert">{actionError}</p>}
      {selectedProduct && (
        <ConfirmModal
          confirming={isDeleting}
          message={`Tem certeza de que deseja excluir "${selectedProduct.name}"? Esta ação não pode ser desfeita.`}
          onCancel={() => setSelectedProduct(null)}
          onConfirm={() => void confirmDelete()}
          title="Excluir produto"
        />
      )}
    </main>
  );
}

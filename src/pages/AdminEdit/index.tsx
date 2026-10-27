import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useProduct, useProducts } from "../../hooks/useProducts";
import type { ProductInput } from "../../types/product";
import { apiErrorMessage, isNotFoundError } from "../../utils/apiErrors";

export default function AdminEdit() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error: loadError } = useProduct(id);
  const { updateProduct, isUpdating } = useProducts();
  const [error, setError] = useState("");

  async function submit(values: ProductInput) {
    setError("");
    try {
      await updateProduct({ id, product: values });
      navigate("/admin");
    } catch (requestError) {
      setError(apiErrorMessage(requestError));
    }
  }

  if (isLoading) {
    return <main className="page-shell"><p className="status-message">Carregando produto…</p></main>;
  }
  if (loadError || !product) {
    const message = isNotFoundError(loadError)
      ? "Produto não encontrado."
      : "Não foi possível carregar o produto.";
    return <main className="page-shell"><p className="error-message" role="alert">{message}</p></main>;
  }

  return (
    <main className="page-shell">
      <Link className="back-link" to="/admin">← Voltar aos produtos</Link>
      <header className="page-heading"><h1>Editar produto</h1></header>
      {error && <p className="error-message" role="alert">{error}</p>}
      <ProductForm onSubmit={submit} product={product} submitting={isUpdating} />
    </main>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useProducts } from "../../hooks/useProducts";
import type { ProductInput } from "../../types/product";
import { apiErrorMessage } from "../../utils/apiErrors";

export default function AdminCreate() {
  const navigate = useNavigate();
  const { createProduct, isCreating } = useProducts();
  const [error, setError] = useState("");

  async function submit(product: ProductInput) {
    setError("");
    try {
      await createProduct(product);
      navigate("/admin");
    } catch (requestError) {
      setError(apiErrorMessage(requestError));
    }
  }

  return (
    <main className="page-shell">
      <Link className="back-link" to="/admin">← Voltar aos produtos</Link>
      <header className="page-heading"><h1>Novo produto</h1></header>
      {error && <p className="error-message" role="alert">{error}</p>}
      <ProductForm onSubmit={submit} submitting={isCreating} />
    </main>
  );
}

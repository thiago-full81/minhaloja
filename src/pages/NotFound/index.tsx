import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page-shell not-found">
      <p className="eyebrow">Erro 404</p>
      <h1>Página não encontrada</h1>
      <p className="muted">O endereço acessado não corresponde a uma página da loja.</p>
      <Link className="button button--primary" to="/">Voltar à loja</Link>
    </main>
  );
}

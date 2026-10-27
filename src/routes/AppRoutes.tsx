import { Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import AdminCreate from "../pages/AdminCreate";
import AdminEdit from "../pages/AdminEdit";
import AdminList from "../pages/AdminList";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";

export default function AppRoutes() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ProductDetail />} path="/products/:id" />
        <Route element={<Cart />} path="/carrinho" />
        <Route element={<AdminList />} path="/admin" />
        <Route element={<AdminCreate />} path="/admin/novo" />
        <Route element={<AdminEdit />} path="/admin/:id/editar" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

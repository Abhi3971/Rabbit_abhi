import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import MainContent from "../src/components/common/MainContent";
import ProductDetail from "../src/components/common/ProductDetail";
import ProductPage from "./components/layout/Productpage";
import { CartProvider } from "./components/cart/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/common/Checkout";
import Order from "./components/common/order";
import Signup from "./components/common/signup";
import Login from "./components/common/login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminOrders from "./components/admin/Adminorder";
import AdminProducts from "./components/admin/AdminProduct";
import AdminLogin from "./components/admin/AdminLogin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import CreateProduct from "./components/common/CreateProduct";
import EditProduct from "./components/common/EditProduct";

const App = () => {
  return (
    <CartProvider>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Removed <BrowserRouter> — it’s already in main.jsx */}
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<MainContent />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Order />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default App;

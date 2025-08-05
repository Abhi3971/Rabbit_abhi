import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/admin"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Manage Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

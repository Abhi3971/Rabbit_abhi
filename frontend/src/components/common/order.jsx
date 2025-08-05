import React from "react";
import { Link } from "react-router-dom";

const orders = [
  {
    id: "ORD12345",
    date: "2024-07-05",
    total: 89.99,
    status: "Delivered",
    items: [
      { name: "Blue T-Shirt", quantity: 1, price: 29.99 },
      { name: "Black Jeans", quantity: 2, price: 30.00 },
    ],
  },
  {
    id: "ORD12346",
    date: "2024-06-21",
    total: 49.50,
    status: "Shipped",
    items: [
      { name: "Red Hoodie", quantity: 1, price: 49.50 },
    ],
  },
];

const Order = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <p className="text-gray-700 font-medium">Order ID: {order.id}</p>
                  <p className="text-gray-500 text-sm">Date: {order.date}</p>
                  <p className="text-gray-500 text-sm">Status: {order.status}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <p className="text-gray-800 font-semibold">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-gray-700 font-medium mb-2">Items:</h3>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600"
                    >
                      <span>{item.quantity} × {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;

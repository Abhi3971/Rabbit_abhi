import React from 'react';
import { IoMdClose } from "react-icons/io";
import CartContent from '../cart/CartContent';
import { useCart } from '../cart/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ Total price calculation
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ Handle checkout navigation
  const handleCheckout = () => {
    toggleCartDrawer(); // Close the drawer
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[25rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex justify-end items-center p-4 border-b sticky top-0 bg-white z-10">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContent />
      </div>

      {/* Footer with total and buttons */}
      <div className="p-4 border-t bg-white sticky bottom-0">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-lg">Total:</span>
          <span className="font-bold text-lg">₹{totalPrice.toLocaleString()}</span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;

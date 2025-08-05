import React, { useState } from 'react';
import { useCart } from '../cart/CartContext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate(); // ✅ Step 1: Navigation hook

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [error, setError] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError('Please fill out all fields');
      return;
    }

    setError('');
    alert('🎉 Order placed successfully!');
    navigate('/'); // ✅ Step 2: Navigate to homepage after order
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-start justify-between border-b pb-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQty(item.productId)}
                          className="w-8 h-8 text-lg border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item.productId)}
                          className="w-8 h-8 text-lg border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="mt-2 text-red-600 hover:text-red-800"
                    >
                      <RiDeleteBin6Line className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t mt-6 pt-4 text-lg font-semibold">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Billing Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>

            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md"
                value={form.phone}
                onChange={handleChange}
              />
              <textarea
                name="address"
                rows="4"
                placeholder="Shipping Address"
                className="w-full px-4 py-2 border rounded-md resize-none"
                value={form.address}
                onChange={handleChange}
              ></textarea>

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <button
                type="button"
                className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                onClick={handleSubmit}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

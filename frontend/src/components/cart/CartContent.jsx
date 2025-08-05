import React from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
import { useCart } from './CartContext'; // ✅ Adjust path as needed

const CartContent = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div>
      {cart.map((product, index) => (
        <div key={index} className='flex items-start justify-between py-4 border-b'>
          <div className='flex items-start'>
            <img
              src={product.image}
              alt={product.name}
              className='w-20 h-24 object-cover mr-4 rounded'
            />
            <div>
              <h3>{product.name}</h3>
              <p className='text-sm text-gray-500'>Size: {product.size}</p>
              <div className='flex items-center mt-2'>
                {/* Decrease quantity */}
                <button
                  onClick={() => decreaseQty(product.productId, product.size)}
                  className='border rounded px-2 py-1 text-xl font-medium'
                >
                  -
                </button>
                <span className='mx-4'>{product.quantity}</span>
                {/* Increase quantity */}
                <button
                  onClick={() => increaseQty(product.productId, product.size)}
                  className='border rounded px-2 py-1 text-xl font-medium'
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end justify-between'>
            <p className='text-sm font-semibold'>
              ₹{(product.price * product.quantity).toLocaleString()}
            </p>
            {/* Remove product */}
            <button onClick={() => removeFromCart(product.productId, product.size)}>
              <RiDeleteBin3Line className='h-6 w-6 mt-6 text-red-600' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;

import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product._id, 
      name: product.name,
      image: product.image?.url,
      price: product.price,
      size: product.sizes?.[0] || "M", 
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      {/* Clickable product details */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image?.url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-60 object-contain rounded-md mb-3"
        />
        <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
        <div className="flex items-center text-yellow-500 text-xs mb-1">
          {[...Array(Math.round(product.rating || 0))].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-gray-500 ml-1">
            ({product.numReviews || 0})
          </span>
        </div>
        <p className="text-green-600 font-bold text-sm mb-2">₹{product.price}</p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white text-sm py-1.5 rounded-md mt-2"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

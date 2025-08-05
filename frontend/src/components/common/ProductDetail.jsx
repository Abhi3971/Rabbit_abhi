import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // add useNavigate
import { FaStar } from "react-icons/fa";
import { useCart } from "../cart/CartContext";
import toast from "react-hot-toast";
import API from "../../api/Axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if logged-in user is admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return <div className="p-10 text-center text-xl">Loading product...</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      image: product.image?.url,
      price: product.price,
      size: selectedSize,
      quantity,
    });

    toast.success(`${product.name} added to cart`);

    setSelectedSize("");
    setQuantity(1);
  };

  // Delete product handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Product deleted successfully");
        navigate("/"); // redirect after delete
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  // Update product handler (redirects to edit page)
  const handleUpdate = () => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="max-w-screen-xl w-full bg-white rounded-2xl shadow p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image with fixed height */}
        <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
          <img
            src={product.image?.url}
            alt={product.image?.allText || product.name}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center text-yellow-500 text-sm mb-2">
              {[...Array(Math.round(product.rating || 0))].map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-gray-600 ml-2">({product.numReviews || 0})</span>
            </div>

            <p className="text-green-600 text-2xl font-semibold mb-4">
              ₹{product.price}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Select Size:</label>
              {product.sizes && product.sizes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-md transition ${
                        selectedSize === size
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-800 hover:border-blue-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-1">No sizes available</p>
              )}
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block mb-1 text-sm font-medium">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
            >
              Add to Cart
            </button>
          </div>

          {/* Admin Buttons - visible only to admin */}
          {isAdmin && (
            <div className="mt-6 flex gap-4 justify-between">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
              >
                Update Product
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

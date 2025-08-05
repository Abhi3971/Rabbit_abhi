import React, { useState, useEffect } from "react";
import API from "../../api/Axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") {
      setIsAdmin(true);
    } else {
      toast.error("Access denied!");
      navigate("/"); // Redirect non-admins
    }
  }, [navigate]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    sizes: [],
    image: "",
    gender: "",
    inStock: true,
    fastDelivery: false,
  });

  const [sizeInput, setSizeInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSize = () => {
    if (sizeInput && !productData.sizes.includes(sizeInput)) {
      setProductData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, sizeInput],
      }));
      setSizeInput("");
    }
  };

  const handleRemoveSize = (size) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!productData.gender) {
      toast.error("Please select a gender");
      return;
    }
    if (!productData.category) {
      toast.error("Please select a category");
      return;
    }

    const finalData = { ...productData, image: { url: productData.image } };
    console.log("Payload being sent:", finalData);

    try {
      await API.post("/products", finalData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token
        },
      });
      toast.success("Product created successfully!");
      navigate("/products"); // Redirect to product listing
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  if (!isAdmin) return null; // Don't render form if not admin

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Description */}
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Category */}
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Category</option>
          <option value="Top Wear">Top Wear</option>
          <option value="Bottom Wear">Bottom Wear</option>
        </select>

        {/* Brand */}
        <input
          type="text"
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border rounded px-3 py-2"
        />

        {/* Gender */}
        <select
          name="gender"
          value={productData.gender}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>

        {/* Sizes */}
        <div>
          <div className="flex">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Add Size (e.g., S, M, L)"
              className="border rounded px-3 py-2 flex-1"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {productData.sizes.map((size) => (
              <span
                key={size}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveSize(size)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* In Stock & Fast Delivery */}
        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={productData.inStock}
              onChange={handleChange}
              className="mr-2"
            />
            In Stock
          </label>
          <label>
            <input
              type="checkbox"
              name="fastDelivery"
              checked={productData.fastDelivery}
              onChange={handleChange}
              className="mr-2"
            />
            Fast Delivery
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

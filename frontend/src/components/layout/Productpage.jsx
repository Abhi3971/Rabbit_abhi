import React, { useEffect, useState } from "react";
import API from "../../api/Axios";
import { FaStar, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const FilterSidebar = ({ filters, handleFilterChange, handleSortChange }) => (
  <div className="space-y-6">
    {/* Filters */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      <label className="block mb-1">
        <input
          type="checkbox"
          name="inStock"
          checked={filters.inStock}
          onChange={handleFilterChange}
          className="mr-2"
        />
        In Stock
      </label>
      <label className="block mb-1">
        <input
          type="checkbox"
          name="fastDelivery"
          checked={filters.fastDelivery}
          onChange={handleFilterChange}
          className="mr-2"
        />
        Fast Delivery
      </label>
      <label className="block mb-1">
        <input
          type="checkbox"
          name="rating"
          checked={filters.rating}
          onChange={handleFilterChange}
          className="mr-2"
        />
        4★ & above
      </label>
    </div>

    {/* Category */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Category</h3>
      {["Top Wear", "Bottom Wear"].map((category) => (
        <label key={category} className="block mb-1">
          <input
            type="checkbox"
            name="category"
            value={category}
            checked={filters.category.includes(category)}
            onChange={handleFilterChange}
            className="mr-2"
          />
          {category}
        </label>
      ))}
    </div>

    {/* Size */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Size</h3>
      {["S", "M", "L", "XL"].map((size) => (
        <label key={size} className="block mb-1">
          <input
            type="checkbox"
            name="size"
            value={size}
            checked={filters.size.includes(size)}
            onChange={handleFilterChange}
            className="mr-2"
          />
          {size}
        </label>
      ))}
    </div>

    {/* Gender */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Gender</h3>
      {["Men", "Women"].map((gender) => (
        <label key={gender} className="block mb-1">
          <input
            type="checkbox"
            name="gender"
            value={gender}
            checked={filters.gender.includes(gender)}
            onChange={handleFilterChange}
            className="mr-2"
          />
          {gender}
        </label>
      ))}
    </div>

    {/* Sort */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Sort By</h3>
      <label className="block mb-1">
        <input
          type="radio"
          name="sort"
          value="lowToHigh"
          checked={filters.sort === "lowToHigh"}
          onChange={handleSortChange}
          className="mr-2"
        />
        Price - Low to High
      </label>
      <label className="block mb-1">
        <input
          type="radio"
          name="sort"
          value="highToLow"
          checked={filters.sort === "highToLow"}
          onChange={handleSortChange}
          className="mr-2"
        />
        Price - High to Low
      </label>
    </div>
  </div>
);

const ProductPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const genderParam = queryParams.get("gender");

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    inStock: false,
    fastDelivery: false,
    rating: false,
    sort: "",
    category: categoryParam ? [categoryParam] : [],
    size: [],
    gender: genderParam ? [genderParam] : [],
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update filters when category or gender param changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam ? [categoryParam] : [],
      gender: genderParam ? [genderParam] : [],
    }));
  }, [categoryParam, genderParam]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (["category", "size", "gender"].includes(name)) {
      setFilters((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    }
    setShowSidebar(false);
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
    setShowSidebar(false);
  };

  // Filtering
  let filteredProducts = [...products];
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter((p) => p.inStock === true);
  }
  if (filters.fastDelivery) {
    filteredProducts = filteredProducts.filter((p) => p.fastDelivery === true);
  }
  if (filters.rating) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= 4);
  }
  if (filters.category.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      filters.category.includes(p.category)
    );
  }
  if (filters.size.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      p.sizes?.some((size) => filters.size.includes(size))
    );
  }
  if (filters.gender.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      filters.gender.includes(p.gender)
    );
  }

  // Sorting
  if (filters.sort === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  return (
    <div className="relative">
      {/* Hamburger */}
      <div className="md:hidden px-4 pt-4 pb-2">
        <button
          onClick={() => setShowSidebar(true)}
          className="bg-white shadow p-2 rounded-md"
        >
          <FaBars />
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/4">
          <div className="bg-white shadow rounded-xl p-4">
            <FilterSidebar
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleSortChange={handleSortChange}
            />
          </div>
        </aside>

        {/* Products */}
        <section className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-xl overflow-hidden p-4 hover:shadow-lg transition"
              >
                <img
                  src={product.image?.url || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-64 object-contain mb-4 rounded"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-green-600 font-bold">
                    ₹{product.price}
                  </span>
                  <span className="text-yellow-500 flex items-center">
                    <FaStar className="mr-1" /> {product.rating}
                  </span>
                </div>
                <Link
                  to={`/product/${product._id}`}
                  className="w-full block text-center bg-blue-600 text-white text-sm py-1.5 rounded-md mt-3"
                >
                  View Product
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No products found.
            </p>
          )}
        </section>
      </div>

      {/* Mobile Sidebar Drawer */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-72 p-4 h-full shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowSidebar(false)}>
                <FaTimes />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleSortChange={handleSortChange}
            />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setShowSidebar(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;

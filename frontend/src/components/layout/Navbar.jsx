import React, { useState, useEffect, useRef } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Search from "../common/Search";
import CartDrawer from "./CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../cart/CartContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { cart } = useCart();

  // Get login and admin state
  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
  }, [drawerOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setIsUserDropdownOpen(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Fixed Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-medium">
              Rabbit
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/products?gender=Men"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Men
            </Link>
            <Link
              to="/products?gender=Women"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Women
            </Link>
            <Link
              to="/products?category=Top Wear"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Top Wear
            </Link>
            <Link
              to="/products?category=Bottom Wear"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Bottom Wear
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                className="hover:text-black flex items-center justify-center"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <Link
                    to="/orders"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Order History
                  </Link>

                  {/* Only show to Admin */}
                  {isAdmin && (
                    <Link
                      to="/create-product"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Create New Product
                    </Link>
                  )}

                  {!isLoggedIn && (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                  {isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {totalQty}
                </span>
              )}
            </button>

            {/* Search */}
            <Search />

            {/* Mobile Menu Button */}
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/products?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/products?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/products?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="/products?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

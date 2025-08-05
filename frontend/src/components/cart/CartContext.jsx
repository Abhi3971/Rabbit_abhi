import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}`;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [guestId, setGuestId] = useState(() => localStorage.getItem('guestId') || `guest_${Date.now()}`);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  // Save guestId
  useEffect(() => {
    localStorage.setItem('guestId', guestId);
  }, [guestId]);

  // Fetch cart whenever user or guest changes
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (userId) {
          // Fetch logged-in user's cart
          const { data } = await axios.get(`/api/cart?userId=${userId}`);
          setCart(data?.products || []);
        } else {
          // Fetch guest cart
          const { data } = await axios.get(`/api/cart?guestId=${guestId}`);
          setCart(data?.products || []);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        setCart([]);
      }
    };
    fetchCart();
  }, [userId, guestId]);

  // Add item to cart
  const addToCart = async (product) => {
    try {
      const { data } = await axios.post("/api/cart", {
        productId: product.productId,
        quantity: product.quantity || 1,
        size: product.size,
        guestId: userId ? null : guestId, // guestId only if not logged in
        userId: userId || null,
      });
      setCart(data.products);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const increaseQty = async (productId, size) => {
    try {
      const { data } = await axios.post("/api/cart", {
        productId,
        size,
        quantity: 1,
        guestId: userId ? null : guestId,
        userId: userId || null,
      });
      setCart(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (productId, size) => {
    try {
      const { data } = await axios.put(`/api/cart/decrease`, { productId, size, guestId: userId ? null : guestId, userId: userId || null });
      setCart(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      const { data } = await axios.post(`/api/cart/remove`, { productId, size, guestId: userId ? null : guestId, userId: userId || null });
      setCart(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  // Logout: clear user and cart
  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    setCart([]);
    window.location.reload(); // refresh page
  };

  // Login: set user and fetch user cart
  const login = (newUserId) => {
    localStorage.setItem('userId', newUserId);
    setUserId(newUserId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, login, logout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// src/utils/cart.js
export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product, quantity = 1, size = "") {
  let cart = getCart();
  // If item with same id & size exists, increment qty.
  const idx = cart.findIndex(i => i.id === product.id && i.size === size);
  if (idx > -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({ ...product, quantity, size });
  }
  saveCart(cart);
}

export function removeFromCart(id, size = "") {
  let cart = getCart();
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

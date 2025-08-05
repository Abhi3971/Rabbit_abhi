// src/utils/api.js
const API_BASE = "http://localhost:5000/api";

export async function loginApi(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json(); // { token, user }
}

export async function signupApi(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json(); // { token, user }
}

export async function placeOrderApi(order, token) {
  const res = await fetch(`${API_BASE}/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(order)
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export async function fetchOrdersApi(token) {
  const res = await fetch(`${API_BASE}/orders/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// All API calls: products (dummyjson) + users & orders (mockapi)
import axios from 'axios';

const DJ  = 'https://dummyjson.com';

// ⚠️  Replace with your MockAPI project URL after creating account at mockapi.io
const MOCK = 'https://69dcc5a784f912a264042731.mockapi.io';

// --- Products ---
export async function getProducts({ limit = 20, skip = 0, search = '', category = '' } = {}) {
  try {
    let url = `${DJ}/products?limit=${limit}&skip=${skip}`;
    if (search)   url = `${DJ}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    if (category) url = `${DJ}/products/category/${category}?limit=${limit}&skip=${skip}`;
    const { data } = await axios.get(url);
    return data;
  } catch { return { products: [], total: 0 }; }
}

export async function getProductById(id) {
  const { data } = await axios.get(`${DJ}/products/${id}`);
  return data;
}

export async function getCategories() {
  const { data } = await axios.get(`${DJ}/products/categories`);
  return data;
}

export async function getProductsByCategory(category, limit = 8) {
  const { data } = await axios.get(`${DJ}/products/category/${category}?limit=${limit}`);
  return data;
}

// --- Users (MockAPI) ---
export async function registerUser(payload) {
  const { data } = await axios.post(`${MOCK}/users`, payload);
  return data;
}

export async function loginUserApi({ email, password }) {
  const { data } = await axios.get(`${MOCK}/users`);
  const user = data.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  return user;
}

export async function updateUserApi(id, payload) {
  const { data } = await axios.put(`${MOCK}/users/${id}`, payload);
  return data;
}

// --- Orders (MockAPI) ---
export async function createOrder(payload) {
  const { data } = await axios.post(`${MOCK}/orders`, payload);
  return data;
}

export async function getUserOrders(userId) {
  const { data } = await axios.get(`${MOCK}/orders`);
  return data.filter(o => String(o.userId) === String(userId));
}

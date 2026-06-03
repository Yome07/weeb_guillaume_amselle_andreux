import axios from 'axios';

// Instance publique — sans token (register, login, forgot password...)
export const publicApi = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instance privée — avec token (routes protégées)
const api = axios.create({
  baseURL: '/', // Proxié vers Django via Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
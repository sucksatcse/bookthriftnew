// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Attach token automatically when present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (email, password) =>
  API.post('/user/login', { email, password });

export const registerUser = ({ name, email, contact, password }) =>
  API.post('/user/signup', { name, email, contact, password });

export default API;
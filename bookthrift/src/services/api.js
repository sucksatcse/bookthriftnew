import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend runs on different port
});

export default API;
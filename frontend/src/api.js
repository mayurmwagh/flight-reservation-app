import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export default api;

import axios from "axios";


const productsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  
});

productsApi.interceptors.request.use(
  (config) => {
    // Leer token desde localStorage (solo si estás del lado del cliente)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default productsApi;

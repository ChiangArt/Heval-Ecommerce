import axios from "axios";

console.log("API base URL en tiempo de build/ejecución:", process.env.NEXT_PUBLIC_API_URL);

const productsApi = axios.create({
  
  baseURL: process.env.NEXT_PUBLIC_API_URL, 

 
});

productsApi.interceptors.request.use(
  (config) => {
    
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default productsApi;

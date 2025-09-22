import axios from "axios";
import AuthService from "./auth/Auth.service";

export const apiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token si existe
apiBackend.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken(); // O sessionStorage
    const skipAuth = config?.headers?.skipAuth;

    // Solo se agrega el token si no se especifica que se debe saltar la autenticación
    if (token && !skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Elimina la propiedad skipAuth del header para que no se envíe al backend
    if (skipAuth) {
      delete config.headers.skipAuth;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

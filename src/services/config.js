import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://code-connect-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// For file uploads
export const uploadClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://code-connect-api.onrender.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

uploadClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

console.log("base", import.meta.env.VITE_API_URL);

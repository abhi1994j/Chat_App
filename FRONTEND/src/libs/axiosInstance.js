import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials:true,
  timeout: 1000,
});

export {axiosInstance};
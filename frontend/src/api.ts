import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "./constants";


const api : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config : InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
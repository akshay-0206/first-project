import axios from "axios"
import { API_URL } from "./constants"
import reactSecureLocalStorage from 'react-secure-storage';

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL:API_URL
    });

    instance.interceptors.request.use((config)=>{
        const token = reactSecureLocalStorage.getItem('token');

        if(token){
         config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
}

export const Api = createAxiosInstance();
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create( {
    baseURL: `http://localhost:5000`,
    timeout: 20000,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
} );
  
export default axiosInstance;
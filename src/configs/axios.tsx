import axios, { AxiosError } from 'axios';
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  responseType: 'json',
  timeout: 10000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.request) {
      if (error.request.status === 404 || error.request.status === 0)
        console.log(
          error.response?.data?.message || 'Böyle bir sayfa bulunamadı.'
        );
      else if (error.request.status === 400)
        console.log(
          error.response?.data?.message ||
            'Hatalı ya da eksik parametre gönderildi.'
        );
      else if (error.request.status === 500)
        console.log(
          error.response?.data?.message || 'Sunucu erişimi yapılamadı'
        );
    }
    return Promise.reject(error);
  }
);

export default API;

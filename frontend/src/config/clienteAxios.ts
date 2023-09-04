import axios, { AxiosError } from 'axios';
import { ILocalStorageInfo } from '../interfaces/localStorageInfo.interface';

const urlsNoToken = ['login', 'usuarios'];

export const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: { 'Content-Type': 'application/json' }
});

clienteAxios.interceptors.request.use((request) => {
  const usuarioInfoStorage = localStorage.getItem('usuarioInfo');
  if (usuarioInfoStorage) {
    const usuarioInfo = JSON.parse(usuarioInfoStorage) as ILocalStorageInfo;
    if (!urlsNoToken.includes(request.url || '') && usuarioInfo.token) {
      request.headers.set({
        'x-token': usuarioInfo.token
      });
    }
  }
  return request;
});

clienteAxios.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.newToken) {
      const usuarioInfoStorage = localStorage.getItem('usuarioInfo');
      if (usuarioInfoStorage) {
        const usuarioInfo = JSON.parse(usuarioInfoStorage) as ILocalStorageInfo;
        usuarioInfo.token = response.data.newToken;
        localStorage.setItem('usuarioInfo', JSON.stringify(usuarioInfo));
        const originalRequest = response.config;
        originalRequest.headers['x-token'] = response.data.newToken;
        return axios(originalRequest);
      }
    }

    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

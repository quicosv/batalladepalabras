import axios, { AxiosError } from 'axios';
import { ILocalStorageInfo } from '../interfaces/localStorageInfo.interface';

const urlsNoToken = ['login', 'jugadores'];

export const clienteAxios = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
	headers: { 'Content-Type': 'application/json' }
});

clienteAxios.interceptors.request.use((request) => {
	const jugadorInfoStorage = localStorage.getItem('jugadorInfo');
	if (jugadorInfoStorage) {
		const jugadorInfo = JSON.parse(jugadorInfoStorage) as ILocalStorageInfo;
		if (!urlsNoToken.includes(request.url || '') && jugadorInfo.token) {
			request.headers.set({
				'x-token': jugadorInfo.token
			});
		}
	}
	return request;
});

clienteAxios.interceptors.response.use(
	(response) => {
		if (response.status === 200 && response.data.newToken) {
			const jugadorInfoStorage = localStorage.getItem('jugadorInfo');
			if (jugadorInfoStorage) {
				const jugadorInfo = JSON.parse(jugadorInfoStorage) as ILocalStorageInfo;
				jugadorInfo.token = response.data.newToken;
				localStorage.setItem('jugadorInfo', JSON.stringify(jugadorInfo));
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

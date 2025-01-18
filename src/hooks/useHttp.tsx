import axios from 'axios';
import { APIS, PUZZLE_API, SSO_API, APIURLS } from '../configs/APIURL';

export const useHttp = (resourceApi: APIS = PUZZLE_API) => {
  const token = localStorage.getItem('token');

  function getApiUrl(api: APIS): string {
    switch (api) {
      case PUZZLE_API:
        return APIURLS.PUZZLE_API;
      case SSO_API:
        return APIURLS.SSO_API;
      default:
        throw new Error('API not found');
    }
  }
  const apiUrl = getApiUrl(resourceApi);
  return CreateNewInstance(apiUrl, token ?? undefined);
};

function CreateNewInstance(baseUrl: string, token?: string) {
  const instance = axios.create({});

  instance.defaults.baseURL = baseUrl;

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response?.status ?? 500;

      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        window.location.reload();
      }

      if (status === 500) {
        console.log('500 error', error);
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

import { fetchUtils } from 'react-admin';

import jsonServerProvider from './ra-data-json-server';

import { authToken } from './authProvider';

export * from './authRoles';
export * from './authProvider';
export * from './AuthRequest';

const apiURL = process.env.REACT_APP_API_URL;

const httpClient = (url, options = {}) => {
  const token = authToken();
  if (token) {
    const bearerToken = `Bearer ${token}`;
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('Authorization', bearerToken);
  }
  return fetchUtils.fetchJson(url, options);
};
export const dataProvider = jsonServerProvider(apiURL, httpClient);

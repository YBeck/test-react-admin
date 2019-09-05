import { fetchUtils } from 'react-admin';

import jsonServerProvider from './ra-data-json-server';

import { authToken } from './authProvider';

export * from './authRoles';
export * from './authProvider';

const url = process.env.REACT_APP_API_URL;

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
export const dataProvider = jsonServerProvider(url, httpClient);

/** An axios compatible fetch client using `authFetchJson`. */
export const authClient = {
  /** HTTP Get
   * @param {string} url Relative url to an API endpoint.
   * @param {RequestInit} [options] Request options.
   */
  get(url, options) {
    return jsonServerProvider(url, { method: 'GET', ...options });
  },
  /** HTTP Delete
   * @param {string} url Relative url to an API endpoint.
   * @param {RequestInit} [options] Request options.
   */
  delete(url, options) {
    return jsonServerProvider(url, { method: 'DELETE', ...options });
  },
  /** HTTP Post
   * @param {string} url Relative url to an API endpoint.
   * @param {BodyInit} [data] Request options.
   * @param {RequestInit} [options]
   */
  post(url, data, options) {
    return jsonServerProvider(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },
  /** HTTP Put
   * @param {string} url Relative url to an API endpoint.
   * @param {BodyInit} [data] Request options.
   * @param {RequestInit} [options]
   */
  put(url, data, options) {
    return jsonServerProvider(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },
};

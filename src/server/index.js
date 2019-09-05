import { fetchUtils } from 'react-admin';

import jsonServerProvider from './ra-data-json-server';

import { authToken } from './authProvider';

export * from './authRoles';
export * from './authProvider';

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

/** An axios compatible fetch client using `authFetchJson`. */
export const authClient = {
  /** HTTP Get
   * @param {string} url Relative url to an API endpoint.
   * @param {RequestInit} [options] Request options.
   */
  get(url, options, callback = defaultResponseCallback) {
    // TODO MAKE REAL!!!!!!!!!!
    return httpClient('http://localhost:10010/api' + url, {
      method: 'GET',
      ...options,
    })
      .then(callback)
      .catch(err => ({ error: err }));
  },
  /** HTTP Delete
   * @param {string} url Relative url to an API endpoint.
   * @param {RequestInit} [options] Request options.
   */
  delete(url, options, callback = defaultResponseCallback) {
    return httpClient(apiURL + url, { method: 'DELETE', ...options })
      .then(callback)
      .catch(err => ({ error: err }));
  },
  /** HTTP Post
   * @param {string} url Relative url to an API endpoint.
   * @param {BodyInit} [data] Request options.
   * @param {RequestInit} [options]
   */
  post(url, data, options, callback = defaultResponseCallback) {
    return httpClient(apiURL + url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })
      .then(callback)
      .catch(err => ({ error: err }));
  },
  /** HTTP Put
   * @param {string} url Relative url to an API endpoint.
   * @param {BodyInit} [data] Request options.
   * @param {RequestInit} [options]
   */
  put(url, data, options, callback = defaultResponseCallback) {
    return httpClient(apiURL + url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    })
      .then(callback)
      .catch(err => ({ error: err }));
  },
};

function defaultResponseCallback(response) {
  return response;
}

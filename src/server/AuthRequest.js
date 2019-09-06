import axios from "axios";
import qs from "query-string";

const {
  /** The base URL for the API. */
  REACT_APP_API_URL,
  NODE_ENV,
} = process.env;

const IS_DEV = NODE_ENV === "development";

/** Token to apply to each request. */
let authToken;
let authExpirationDate;

/** Id of the interceptor used to apply auth headers. */
let authInterceptorId;

/** Axios instance to use for authenticated requests. */
export const AuthRequest = axios.create({
  baseURL: 'http://localhost:10010/api',  // TODO MAKE REAL!!!!!!!!! REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

/** Default response handler.
 * @param {AxiosAuthResponse} response */
function defaultResponseCallback(response) {
  return response;
}
/** Performs a `DELETE` with authorization.
 * @param {string | [string, any]} url
 * @param {(response:AxiosAuthResponse)=>AxiosAuthResponse} [callback]
 * @param {any} [defaultResponseData]
 * @returns {Promise<AxiosAuthResponse>} */
export async function authDelete(
  url,
  callback = defaultResponseCallback,
  defaultResponseData = [],
) {
  const nurl = normalizeURL(url);
  return AuthRequest.delete(nurl)
    .catch(normalizeResponseError("DELETE", nurl, defaultResponseData))
    .then(callback);
}
/** Performs a GET with authorization.
 * @param {string | [string, any]} url
 * @param {(response:AxiosAuthResponse)=>AxiosAuthResponse} [callback]
 * @param {any} [defaultResponseData]
 * @returns {Promise<AxiosAuthResponse>} */
export async function authGet(
  url,
  callback = defaultResponseCallback,
  defaultResponseData = [],
) {
  const nurl = normalizeURL(url);
  return AuthRequest.get(nurl)
    .catch(normalizeResponseError("GET", nurl, defaultResponseData))
    .then(callback);
}
/** Performs a GET with authorization.
 * @param {string | [string, any]} url
 * @param {(response:AxiosAuthResponse)=>AxiosAuthResponse} [callback]
 * @param {any} [defaultResponseData]
 * @returns {Promise<AxiosAuthResponse>} */
export async function authGetObject(url, callback = defaultResponseCallback) {
  return authGet(url, callback, {});
}
/** Performs a POST with authorization.
 * @param {string | [string, any]} url
 * @param {(response:AxiosAuthResponse)=>AxiosAuthResponse} [callback]
 * @param {any} [defaultResponseData]
 * @returns {Promise<AxiosAuthResponse>} */
export async function authPost(
  url,
  data,
  callback = defaultResponseCallback,
  defaultResponseData = {},
) {
  const nurl = normalizeURL(url);
  return AuthRequest.post(nurl, data)
    .catch(normalizeResponseError("POST", nurl, defaultResponseData))
    .then(callback);
}
/** Performs a PUT with authorization.
 * @param {string | [string, any]} url
 * @param {(response:AxiosAuthResponse)=>AxiosAuthResponse} [callback]
 * @param {any} [defaultResponseData]
 * @returns {Promise<AxiosAuthResponse>} */
export async function authPut(
  url,
  data,
  callback = defaultResponseCallback,
  defaultResponseData = {},
) {
  const nurl = normalizeURL(url);
  return AuthRequest.put(nurl, data)
    .catch(normalizeResponseError("PUT", nurl, defaultResponseData))
    .then(callback);
}
/**
 * @param {"GET" | "POST" | "PUT"} operation
 * @param {string} nurl
 */
export function normalizeResponseError(operation, nurl, defaultResponseData) {
  return err => {
    /** @type {import("axios").AxiosResponse} */
    const response = err.response || {
      config: {},
      data: defaultResponseData,
      error: err,
      headers: {},
      status: 0,
      statusText: "",
    };
    response.error = {
      ...response.data,
    };
    response.data = defaultResponseData;
    if (IS_DEV) {
      console.warn(
        `DEFAULT DATA returned for ${operation} "${nurl}"`,
        defaultResponseData,
      );
    }
    return response;
  };
}
/** @param {string | [string, any]} url */
export function normalizeURL(url) {
  if (!Array.isArray(url)) {
    return url;
  }
  const len = url.length;
  if (len < 2) {
    return url[0];
  }
  const query = qs.stringify(url[1]);
  if (query.length < 1) {
    return url[0];
  }
  return `${url[0]}?${query}`;
}

/** Returns true if an auth token has been set and is not expired.
 * @returns {boolean}
 */
export function hasAuthRequestToken() {
  return !!authToken && authExpirationDate > new Date();
}

/** Assigns the token to be sent with each auth request.
 * @param {string} token Server token.
 * @param {string} expiration Date and Time in ISO 8601 format.
 */
export function setAuthRequestToken(token, expiration) {
  if (arguments.length < 2) {
    throw new Error("Token and expiration required.");
  }
  removeAuthRequestToken();
  if (token) {
    authToken = token;
    authExpirationDate = new Date(expiration);
    authInterceptorId = AuthRequest.interceptors.request.use(
      applyAuthHeaders,
      // CONSIDER: An error handler can be passed. (Useful for refresh token
      // logic, to retry requests after refreshing the access token.)
      // (err) => Promise.reject(err),
    );
  }
}
/** Removes the token to be sent with each auth request. */
export function removeAuthRequestToken() {
  authToken = undefined;
  authExpirationDate = undefined;
  if (authInterceptorId !== undefined) {
    AuthRequest.interceptors.request.eject(authInterceptorId);
    authInterceptorId = undefined;
  }
}
/** @param {AxiosRequestConfig} config */
function applyAuthHeaders(config) {
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
}

// #region Typedefs

/** @typedef {import('axios').AxiosResponse} AxiosResponse */
/** @typedef {import('axios').AxiosPromise} AxiosPromise */
/** @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig */
/** @typedef {object} AuthResponseError
 * @property {number} code
 * @property {string} message
 */
/** @typedef {AxiosResponse & {error?:AuthResponseError}} AxiosAuthResponse */
/** @typedef {object} CompatAPIResult
 * @property {boolean} success True if successful.
 * @property {object} data Data returned from server (or default data).
 * @property {boolean} loading Always `false`.
 * @property {string} [message] Error message from server.
 * @property {number} [code] Error code from server.
 */
// #endregion

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS,
} from 'react-admin';
import jwtDecode from 'jwt-decode';
import { authRoles } from './authRoles';
import { reduxStore } from '../createAdminStore';
import { userActions } from '../state/actions';
const { REACT_APP_LOGIN_URL } = process.env;

// let dispatch;

export const authProvider = (type, params) => {
  switch (true) {
    // called when the user attempts to log in
    case type === AUTH_LOGIN:
      return loginUser(params);
    case type === AUTH_LOGOUT:
      // called when the user clicks on the logout button
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      authUser.reset();
      reduxStore().dispatch(userActions.clearUserRofile());
      return Promise.resolve();
    case type === AUTH_ERROR:
      // called when the API returns an error
      const { status } = params;
      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        authUser.reset();
        return Promise.reject();
      }
      return Promise.resolve();
    case type === AUTH_CHECK:
      // called when the user navigates to a new location
      return localStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject();
    case type === AUTH_GET_PERMISSIONS:
      // called when the user navigates to a new location that requires to check the user’s permissions.
      const roles = localStorage.getItem('roles');
      return roles ? Promise.resolve(roles) : Promise.reject();
    default:
      return Promise.reject('Unknown method');
  }
};

function loginUser(params) {
  const { username, password } = params;
  const request = new Request(REACT_APP_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
      email: username,
      password,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(({ token /* , expiration */ }) => {
      const { load } = authUser;
      localStorage.setItem('token', token);
      load(token);
      localStorage.setItem('roles', authUser.roles);
      reduxStore().dispatch(userActions.getUserProfile());
      // dispatch(userActions.storeProfile({ ...rest }))
      
       return Promise.resolve();
      // authEventSubscribers.notify("login");
      // NOTE: Subscribing to the login auth event may work for some cases,
      // but completely reloading the page after a login is the safest way
      // to ensure that the application uses current roles and permissions...

      // setTimeout(() => {
      //   window.location.reload(true);
      // }, 1000);
    });
}

/** Returns the auth token, if any. */
export function authToken() {
  return localStorage.getItem('token');
}

/** Authorized user info. */
export const authUser = {
  id: 0,
  // loggedIn: false,
  roles: [],
  isAdmin: false,
  isSupervisor: false,
  isCase_manager: false,

  /**
   * Loads `authUser` from the given token, if any, and returns a success bool.
   * @param {string} [token] Optional token, otherwise loaded from localStorage.
   */
  load(token) {
    try {
      if (!token) {
        token = authToken();
      }
      if (!token) {
        return false;
      }
      /** @type {AuthTokenInfo} */
      const tokenInfo = jwtDecode(token);
      if (tokenInfo) {        
        const roles = tokenInfo.roles;
        authUser.id = tokenInfo.userId;
        authUser.loggedIn = true;
        authUser.roles = roles;
        authRoles.forEach(ar => {
          authUser[ar.prop] = roles.indexOf(ar.id) > -1;
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  /**
   * Resets all `authUser` props.
   */
  reset() {
    authUser.id = 0;
    authUser.loggedIn = false;
    authUser.roles = [];
    authRoles.forEach(ar => (authUser[ar.prop] = false));
  },
};

export function authorized(roles, permissions, permission) {
  if (!authUser.loggedIn) {
    return false;
  }
  if (authUser.isAdministrator) {
    return true;
  }
  if (roles) {
    const { roles: userRoles } = authUser;
    if (userRoles) {
      if (
        roles.filter(
          r =>
            // Are we authorized in the requested role?
            userRoles.indexOf(r) > -1 &&
            // If a specific permission was requested and specific permissions
            // were declared on the resource, does the role have permission?
            (!permission ||
              !permissions ||
              (permissions[r] && permissions[r].indexOf(permission) > -1)),
        ).length > 0
      ) {
        return true;
      }
    }
  }
  return false;
}

// export function saveDispatch(dispatchFn) {
//   dispatch = dispatchFn;
// }

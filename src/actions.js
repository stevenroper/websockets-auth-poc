import { LOGIN, LOGOUT } from './constants';

export function login(username, password) {
  return {
    type: LOGIN,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
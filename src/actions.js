import { LOGIN } from './constants';

export function login(username, password) {
  return {
    type: LOGIN,
  };
}
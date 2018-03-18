import { LOGIN, LOGOUT } from './constants';

export function login(username, password) {
  const data = JSON.stringify({
    username: username,
    password: password,
  });
  const response = fetch('http://localhost:8080/login', {
    body: data,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return {
    type: LOGIN,
    payload: response,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
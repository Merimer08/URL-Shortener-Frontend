import { authFetch, apiFetch, setToken, clearToken } from './client';

export async function login(email, password) {
  const data = await authFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const token = data?.token || data?.access_token || (data?.data && data.data.token);
  if (!token) {
    throw new Error('No token in response');
  }

  setToken(token);
  return token;
}

export function getAuthenticatedUser() {
  return apiFetch('/user');
}

export function logout() {
  clearToken();
  return apiFetch('/logout', { method: 'POST' });
}

export async function register(email, password) {
  const data = await authFetch('/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  // Si el registro retorna un token directamente, lo guardamos
  const token = data?.token || data?.access_token || (data?.data && data.data.token);
  if (token) {
    setToken(token);
  }
  return data;
}
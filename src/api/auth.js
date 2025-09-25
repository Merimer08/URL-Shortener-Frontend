// src/api/auth.js
import { apiFetch, setToken } from './client';

export async function getAuthenticatedUser() {
  return apiFetch('/api/v1/user'); // requiere Authorization: Bearer
}

export async function login(email, password) {
  const { token, user } = await apiFetch('/api/login', {
    method: 'POST',
    body: { email, password },
  });
  setToken(token);
  return user;
}

export async function logout() {
  try {
    await apiFetch('/api/logout', { method: 'POST' });
  } finally {
    setToken(null);
  }
}

export async function register({ name, email, password, password_confirmation }) {
  return apiFetch('/api/register', {
    method: 'POST',
    body: { name, email, password, password_confirmation },
  });
}

const RAW_BASE = import.meta.env.VITE_API_BASE_URL || 'https://url-shortener-pro.up.railway.app/api';
const VERSION = import.meta.env.VITE_API_VERSION || 'v1';

const AUTH_BASE = RAW_BASE;
const API_BASE = `${RAW_BASE}/${VERSION}`;

function getToken() {
  return localStorage.getItem('authToken');
}

export function setToken(t) {
  localStorage.setItem('authToken', t);
}

export function clearToken() {
  localStorage.removeItem('authToken');
}

async function baseFetch(base, path, options = {}, sendAuth = false) {
  console.log('AUTH CALL ->', base + path);
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (sendAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${base}${path}`, { ...options, headers });
  
  if (!res.ok) {
    let msg = 'Request failed';
    try {
      const j = await res.json();
      msg = j.message || msg;
      if (j.errors) {
        msg = Object.values(j.errors).flat().join(' ');
      }
    } catch (e) {
      console.error('Error parsing error response:', e);
    }
    throw new Error(msg);
  }
  
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : undefined;
}

export function authFetch(path, options = {}) {
  return baseFetch(AUTH_BASE, path, options, false);
}

export function apiFetch(path, options = {}) {
  return baseFetch(API_BASE, path, options, true);
}
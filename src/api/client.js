// src/api/client.js
export const API = 'https://url-shortener-pro.up.railway.app';

let _token = localStorage.getItem('authToken') || null;

export function setToken(t) {
  _token = t || null;
  if (_token) localStorage.setItem('authToken', _token);
  else localStorage.removeItem('authToken');
}

export function getToken() {
  return _token;
}

export async function apiFetch(path, { method = 'GET', headers = {}, body, ...rest } = {}) {
  const opts = {
    method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (getToken()) {
    opts.headers['Authorization'] = `Bearer ${getToken()}`;
  }

  if (body && !(body instanceof FormData)) {
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    if (typeof body !== 'string') body = JSON.stringify(body);
    opts.body = body;
  } else if (body instanceof FormData) {
    opts.body = body;
  }

  const res = await fetch(API + path, opts);
  const text = await res.text();
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? (text ? JSON.parse(text) : null) : text;

  if (!res.ok) {
    const msg = typeof data === 'string' ? data : JSON.stringify(data);
    throw new Error(`${res.status} ${msg}`);
  }
  return data;
}

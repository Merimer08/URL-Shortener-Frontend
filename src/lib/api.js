// Base URL from environment variable
export const BASE = import.meta.env.VITE_API_URL || 'https://url-shortener-pro.up.railway.app';

// Get CSRF cookie before authentication requests
export async function getCsrf() {
  await fetch(`${BASE}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include'
  });
}

// Función auxiliar para manejar las peticiones HTTP
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Importante para enviar/recibir cookies
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// 1. Login
export async function login(email, password) {
  await getCsrf();
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login fallido');
  return res.json();
}

// 2. Get Links (paginado)
export async function getLinks({ page = 1, limit = 10 } = {}) {
  const res = await fetch(`${BASE}/api/v1/links?page=${page}&limit=${limit}`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}

// 3. Create Link
export async function createLink({ target_url, max_clicks }) {
  const res = await fetch(`${BASE}/api/v1/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ target_url, max_clicks })
  });
  if (!res.ok) throw new Error('Error al crear el link');
  return res.json();
}

// 4. Update Link
export async function updateLink(linkId, updates) {
  const res = await fetch(`${BASE}/api/v1/links/${linkId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Error al actualizar el link');
  return res.json();
}

// 5. Delete Link
export async function deleteLink(linkId) {
  const res = await fetch(`${BASE}/api/v1/links/${linkId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al eliminar el link');
  return res.json();
}

// 6. Get Current User
export async function me() {
  const res = await fetch(`${BASE}/api/v1/user`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}

// 7. Logout
export async function logout() {
  await getCsrf();
  const res = await fetch(`${BASE}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al cerrar sesión');
  return res.json();
}

// 8. Get Link Stats
export async function getLinkStats(linkId) {
  const res = await fetch(`${BASE}/api/v1/links/${linkId}/stats`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al obtener estadísticas');
  return res.json();
}

// 9. Register User
export async function register(email, password) {
  await getCsrf();
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
}
}
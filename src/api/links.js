import { apiFetch } from './client';

export function getLinks(page = 1, limit = 10) {
  return apiFetch(`/links?page=${page}&limit=${limit}`);
}
export function createLink(payload) {
  return apiFetch('/links', { method: 'POST', body: JSON.stringify(payload) });
}
export function updateLink(id, updates) {
  return apiFetch(`/links/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
}
export function deleteLink(id) {
  return apiFetch(`/links/${id}`, { method: 'DELETE' });
}
export function linkStats(id) {
  return apiFetch(`/links/${id}/stats`);
}
// si usas restaurar/forzar borrado:
export function restoreLink(id) {
  return apiFetch(`/links/${id}/restore`, { method: 'POST' }); // o PUT/PATCH según tu backend
}
export function forceDeleteLink(id) {
  return apiFetch(`/links/${id}/force`, { method: 'DELETE' });
}

import { apiFetch } from './client';

export function getLinks(page = 1, limit = 10) {
  return apiFetch(`/api/v1/links?page=${page}&limit=${limit}`);
}
export function createLink(payload) {
  return apiFetch('/api/v1/links', { method: 'POST', body: payload });
}
export function updateLink(id, updates) {
  return apiFetch(`/api/v1/links/${id}`, { method: 'PUT', body: updates });
}
export function deleteLink(id) {
  return apiFetch(`/api/v1/links/${id}`, { method: 'DELETE' });
}
export function linkStats(id) {
  return apiFetch(`/api/v1/links/${id}/stats`);
}
export function restoreLink(id) {
  return apiFetch(`/api/v1/links/${id}/restore`, { method: 'POST' });
}
export function forceDeleteLink(id) {
  return apiFetch(`/api/v1/links/${id}/force`, { method: 'DELETE' });
}

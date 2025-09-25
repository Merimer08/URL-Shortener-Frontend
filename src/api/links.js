// src/api/links.js
import { apiFetch } from './client';

export function getLinks(page = 1, view = 'active', perPage = 10) {
  return apiFetch(`/api/v1/links?view=${encodeURIComponent(view)}&page=${page}&per_page=${perPage}`);
}
export function createLink(payload) {
  // payload debe usar las keys del backend: { target_url, expires_at, max_clicks }
  return apiFetch('/api/v1/links', { method: 'POST', body: payload });
}
export function updateLink(id, updates) {
  return apiFetch(`/api/v1/links/${id}`, { method: 'PUT', body: updates });
}
export function deleteLink(id) {
  return apiFetch(`/api/v1/links/${id}`, { method: 'DELETE' }); // soft delete
}
export function restoreLink(id) {
  return apiFetch(`/api/v1/links/${id}/restore`, { method: 'POST' });
}
export function forceDeleteLink(id) {
  return apiFetch(`/api/v1/links/${id}/force`, { method: 'DELETE' }); // hard delete
}
export function linkStats(id) {
  return apiFetch(`/api/v1/links/${id}/stats`);
}

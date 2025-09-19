import { apiFetch } from './client';

/**
 * @param {number} [page=1]
 * @param {'active' | 'trashed'} [scope='active']
 * @returns {Promise<import('../types').PaginatedResponse<import('../types').ShortLink>>}
 */
export const getLinks = async (page = 1, scope = 'active') => {
    const params = new URLSearchParams({
        page: page.toString(),
        scope,
    });
    return apiFetch(`/v1/links?${params.toString()}`);
};

/**
 * @param {Partial<import('../types').ShortLink>} data
 * @returns {Promise<import('../types').ShortLink>}
 */
export const createLink = async (data) => {
    return apiFetch('/v1/links', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

/**
 * @param {string} id
 * @param {Partial<import('../types').ShortLink>} data
 * @returns {Promise<import('../types').ShortLink>}
 */
export const updateLink = async (id, data) => {
    return apiFetch(`/v1/links/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

/**
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteLink = async (id) => {
    return apiFetch(`/v1/links/${id}`, {
        method: 'DELETE',
    });
};

/**
 * @param {string} id
 * @returns {Promise<import('../types').ShortLink>}
 */
export const restoreLink = async (id) => {
    return apiFetch(`/v1/links/${id}/restore`, {
        method: 'POST',
    });
};

/**
 * @param {string} linkId
 * @returns {Promise<import('../types').Stats>}
 */
export const getStats = async (linkId) => {
    return apiFetch(`/v1/links/${linkId}/stats`);
};
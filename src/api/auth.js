import { apiFetch } from './client';

/**
 * @param {Record<string, string>} credentials 
 * @returns {Promise<import('../types').AuthResponse>}
 */
export const login = async (credentials) => {
    return apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

/**
 * @param {Record<string, string>} userData
 * @returns {Promise<import('../types').AuthResponse>}
 */
export const register = async (userData) => {
    return apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

/**
 * @returns {Promise<void>}
 */
export const logout = async () => {
    return apiFetch('/logout', { method: 'POST' });
};

/**
 * @returns {Promise<{user: import('../types').User}>}
 */
export const getAuthenticatedUser = async () => {
    return apiFetch('/user');
};
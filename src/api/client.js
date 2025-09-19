const API_BASE_URL = 'http://localhost:8000/api';

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * @param {Response} response 
 */
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    if (response.ok) {
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return; // For 204 No Content
    }

    /** @type {import('../types').ApiError} */
    const errorData = await response.json();
    let errorMessage = errorData.message || 'An unknown error occurred';
    if (errorData.errors) {
        errorMessage = Object.values(errorData.errors).flat().join(' ');
    }
    throw new Error(errorMessage);
};

/**
 * @param {string} endpoint
 * @param {RequestInit} [options]
 */
export const apiFetch = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...Object.fromEntries(new Headers(options.headers).entries()),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    return handleResponse(response);
};
import { handleRateLimit } from './rateLimit.js';

/**
 * Fetches user data from the GitHub REST API.
 * @param {string} username - The GitHub username to search for.
 * @returns {Promise<object>} - The user data object.
 * @throws {Error} - Throws an error with a user-friendly message if the request fails.
 */
export const fetchUser = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

        // Check for rate limiting first
        const rateLimitError = handleRateLimit(response);
        if (rateLimitError) {
            throw new Error(rateLimitError);
        }

        // Handle specific HTTP status codes
        if (response.status === 404) {
            throw new Error('User not found. Please check the username and try again.');
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch user data (Error: ${response.status}).`);
        }

        return await response.json();
    } catch (error) {
        // If it's a TypeError, it's likely a network issue
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Network error. Please check your internet connection.');
        }

        throw error;
    }
};

/**
 * Fetches repositories for a user from the GitHub REST API.
 * @param {string} username - The GitHub username to search for.
 * @returns {Promise<Array>} - The parsed JSON array of repository objects.
 * @throws {Error} - Throws an error with a user-friendly message if the request fails.
 */
export const fetchRepos = async (username) => {
    try {
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`
        );

        const rateLimitError = handleRateLimit(response);
        if (rateLimitError) {
            throw new Error(rateLimitError);
        }

        if (response.status === 404) {
            throw new Error('User not found. Please check the username and try again.');
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch repositories (Error: ${response.status}).`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Network error. Please check your internet connection.');
        }

        throw error;
    }
};

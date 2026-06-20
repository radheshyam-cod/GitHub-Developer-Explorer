import { handleRateLimit } from './rateLimit.js';

async function fetchFromGitHub(url, errorLabel) {
    try {
        const response = await fetch(url);

        const rateLimitError = handleRateLimit(response);
        if (rateLimitError) throw new Error(rateLimitError);

        if (response.status === 404) {
            throw new Error('User not found. Please check the username and try again.');
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch ${errorLabel} (Error: ${response.status}).`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}

export const fetchUser = (username) =>
    fetchFromGitHub(`https://api.github.com/users/${encodeURIComponent(username)}`, 'user data');

export const fetchRepos = (username) =>
    fetchFromGitHub(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
        'repositories'
    );

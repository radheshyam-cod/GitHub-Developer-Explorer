import { validateUsername } from './validation.js';
import { fetchUser, fetchRepos } from './userApi.js';
import { renderProfile, clearProfile } from './profileRenderer.js';
import { showLoading, hideLoading } from './loader.js';
import { showError, clearError } from './errorHandler.js';
import { setState } from './state.js';
import { renderRepos, initRepoSorting, clearRepos } from './repoRendererNew.js';
import { renderChart, clearLangChart } from './chartRenderer.js';

/**
 * Initializes the search module by setting up form event listeners.
 */
export const initSearch = () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');

    if (!form || !input) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = input.value;

        clearRepos();
        clearLangChart();

        clearError();
        clearProfile();

        const { isValid, error, sanitized } = validateUsername(username);

        if (!isValid) {
            showError(error);
            return;
        }

        showLoading();

        try {
            const [userData, repos] = await Promise.all([fetchUser(sanitized), fetchRepos(sanitized)]);

            setState({ currentUser: userData, repos });

            renderProfile(userData);
            renderRepos();
            renderChart(repos);
            initRepoSorting();

        } catch (err) {
            showError(err.message || 'An unexpected error occurred while fetching user data.');
        } finally {
            hideLoading();
        }
    });
};

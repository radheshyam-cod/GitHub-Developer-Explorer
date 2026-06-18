import { validateUsername } from './validation.js';
import { fetchUser } from './userApi.js';
import { renderProfile, clearProfile } from './profileRenderer.js';
import { showLoading, hideLoading } from './loader.js';
import { showError, clearError } from './errorHandler.js';

/**
 * Initializes the search module by setting up form event listeners.
 */
export const initSearch = () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');

    if (!form || !input) return;

    form.addEventListener('submit', async (e) => {
        // Prevent form submission from reloading the page (handles Enter key and button click natively)
        e.preventDefault();

        const username = input.value;

        // Reset UI states before starting a new search
        clearError();
        clearProfile();

        // 1. Input Validation
        const { isValid, error, sanitized } = validateUsername(username);

        if (!isValid) {
            showError(error);
            return;
        }

        // 2. Begin API Request
        showLoading();

        try {
            // 3. Fetch Data
            const userData = await fetchUser(sanitized);
            
            // 4. Render Data
            renderProfile(userData);
            
        } catch (err) {
            // 5. Handle Errors
            showError(err.message || 'An unexpected error occurred while fetching user data.');
        } finally {
            // 6. Final Cleanup
            hideLoading();
        }
    });
};

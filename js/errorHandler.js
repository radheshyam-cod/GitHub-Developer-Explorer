/**
 * Displays an error message in the UI.
 * @param {string} message - The error message to display.
 */
export const showError = (message) => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
};

/**
 * Clears the error message from the UI.
 */
export const clearError = () => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
};

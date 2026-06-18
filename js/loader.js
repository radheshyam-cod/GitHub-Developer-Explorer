/**
 * Displays the loading skeleton and disables the search button
 */
export const showLoading = () => {
    const loadingContainer = document.getElementById('loading-container');
    const profileContainer = document.getElementById('profile-container');
    const searchBtn = document.getElementById('search-btn');

    loadingContainer.classList.remove('hidden');
    profileContainer.classList.add('hidden');
    
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';
};

/**
 * Hides the loading skeleton and re-enables the search button
 */
export const hideLoading = () => {
    const loadingContainer = document.getElementById('loading-container');
    const searchBtn = document.getElementById('search-btn');

    loadingContainer.classList.add('hidden');
    
    searchBtn.disabled = false;
    searchBtn.textContent = 'Search';
};

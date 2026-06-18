export const showLoading = () => {
    const loadingContainer = document.getElementById('loading-container');
    const dashboardContent = document.getElementById('dashboard-content');
    const searchBtn = document.getElementById('search-btn');

    loadingContainer.classList.remove('hidden');
    
    // Ensure dashboard content is hidden while skeleton loads
    if (dashboardContent) {
        dashboardContent.classList.add('hidden');
    }
    
    if (searchBtn) {
        searchBtn.disabled = true;
        searchBtn.textContent = 'Searching...';
    }
};

export const hideLoading = () => {
    const loadingContainer = document.getElementById('loading-container');
    const dashboardContent = document.getElementById('dashboard-content');
    const searchBtn = document.getElementById('search-btn');

    loadingContainer.classList.add('hidden');
    
    // We only show dashboardContent if the request was successful
    // The search.js handles this, but usually we just reveal it here.
    if (dashboardContent) {
        dashboardContent.classList.remove('hidden');
    }
    
    if (searchBtn) {
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
};

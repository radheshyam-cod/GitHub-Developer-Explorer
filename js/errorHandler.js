export const showError = (message) => {
    const errorContainer = document.getElementById('error-container');
    const dashboardContent = document.getElementById('dashboard-content');
    
    // Determine a title based on message or default
    let title = 'Error';
    if (message.toLowerCase().includes('not found')) {
        title = 'User Not Found';
    } else if (message.toLowerCase().includes('rate limit')) {
        title = 'Rate Limit Exceeded';
    }

    errorContainer.innerHTML = `
        <div class="error-title">
            <span>❌</span> ${title}
        </div>
        <div>${message}</div>
    `;
    
    errorContainer.className = 'error-container animate-slide-up';
    errorContainer.classList.remove('hidden');

    if (dashboardContent) {
        dashboardContent.classList.add('hidden');
    }
};

export const clearError = () => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = '';
    errorContainer.className = 'error-container hidden';
};

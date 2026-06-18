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
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-family: 'Poppins', sans-serif; font-size: 16px; margin-bottom: 4px;">
            <span>❌</span> ${title}
        </div>
        <div>${message}</div>
    `;
    
    // Add CSS class for animation
    errorContainer.className = 'error-container animate-slide-up';
    errorContainer.classList.remove('hidden');

    if (dashboardContent) {
        dashboardContent.classList.add('hidden');
    }
};

export const clearError = () => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = '';
    errorContainer.classList.add('hidden');
    errorContainer.className = 'error-container hidden';
};

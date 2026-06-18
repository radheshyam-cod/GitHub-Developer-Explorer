/**
 * Clears the profile container and hides it.
 */
export const clearProfile = () => {
    const container = document.getElementById('profile-container');
    container.innerHTML = '';
    container.classList.add('hidden');
};

/**
 * Formats an ISO date string to a localized, readable string.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - Formatted date.
 */
const formatDate = (isoString) => {
    if (!isoString) return 'Not Available';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

/**
 * Ensures URLs are absolute.
 * @param {string} url - The URL to normalize.
 * @returns {string} - Absolute URL.
 */
const normalizeUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

/**
 * Renders the GitHub user profile data into the DOM.
 * @param {object} userData - Data returned from the GitHub API.
 */
export const renderProfile = (userData) => {
    const container = document.getElementById('profile-container');

    const {
        avatar_url, name, login, bio, company, location, blog,
        followers, following, public_repos, created_at, html_url
    } = userData;

    // Use name if available, fallback to username
    const displayName = name || login;
    const displayBio = bio || 'This user has not added a bio yet.';
    const displayCompany = company || 'Not Available';
    const displayLocation = location || 'Not Available';
    
    let blogHTML = 'Not Available';
    if (blog) {
        const normalizedBlog = normalizeUrl(blog);
        blogHTML = `<a href="${normalizedBlog}" target="_blank" rel="noopener noreferrer">${blog}</a>`;
    }

    container.innerHTML = `
        <div class="profile-header">
            <img src="${avatar_url}" alt="${login}'s avatar" class="avatar" />
            <h2 class="profile-name">${displayName}</h2>
            <div class="profile-username">
                <a href="${html_url}" target="_blank" rel="noopener noreferrer">@${login}</a>
            </div>
        </div>
        <div class="profile-body">
            <p class="profile-bio">${displayBio}</p>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-value">${public_repos}</div>
                    <div class="stat-label">Repos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${followers}</div>
                    <div class="stat-label">Followers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${following}</div>
                    <div class="stat-label">Following</div>
                </div>
            </div>

            <div class="profile-details">
                <div class="detail-item">
                    <strong>Location:</strong> <span>${displayLocation}</span>
                </div>
                <div class="detail-item">
                    <strong>Company:</strong> <span>${displayCompany}</span>
                </div>
                <div class="detail-item">
                    <strong>Blog/Website:</strong> <span>${blogHTML}</span>
                </div>
                <div class="detail-item">
                    <strong>Joined:</strong> <span>${formatDate(created_at)}</span>
                </div>
            </div>
        </div>
    `;

    container.classList.remove('hidden');
};

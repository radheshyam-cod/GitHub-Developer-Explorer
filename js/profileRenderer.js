export const clearProfile = () => {
    const profileContainer = document.getElementById('profile-container');
    const statsContainer = document.getElementById('stats-container');
    profileContainer.innerHTML = '';
    statsContainer.innerHTML = '';
};

const formatDate = (isoString) => {
    if (!isoString) return 'Not Available';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const normalizeUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

export const renderProfile = (userData) => {
    const profileContainer = document.getElementById('profile-container');
    const statsContainer = document.getElementById('stats-container');

    const {
        avatar_url, name, login, bio, company, location, blog,
        followers, following, public_repos, created_at, html_url
    } = userData;

    const displayName = name || login;
    const displayBio = bio || 'This user has not added a bio yet.';
    const displayCompany = company || 'Not Available';
    const displayLocation = location || 'Not Available';
    
    let blogHTML = 'Not Available';
    if (blog) {
        const normalizedBlog = normalizeUrl(blog);
        blogHTML = `<a href="${normalizedBlog}" target="_blank" rel="noopener noreferrer">${blog}</a>`;
    }

    profileContainer.innerHTML = `
        <div class="profile-card glass-card">
            <div class="profile-avatar-wrapper">
                <img src="${avatar_url}" alt="${login}'s avatar" class="profile-avatar" />
            </div>
            <div class="profile-info">
                <h1>${displayName}</h1>
                <a href="${html_url}" class="profile-username" target="_blank" rel="noopener noreferrer">@${login}</a>
                <p class="profile-bio">${displayBio}</p>

                <div class="profile-details">
                    <div class="detail-item">
                        <span>📍</span>
                        <span>${displayLocation}</span>
                    </div>
                    <div class="detail-item">
                        <span>🏢</span>
                        <span>${displayCompany}</span>
                    </div>
                    <div class="detail-item">
                        <span>🔗</span>
                        <span>${blogHTML}</span>
                    </div>
                    <div class="detail-item">
                        <span>📅</span>
                        <span>Joined ${formatDate(created_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    statsContainer.innerHTML = `
        <div class="stat-card glass-card animate-card">
            <div class="stat-icon-wrap icon-repos">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="stat-value">${public_repos}</div>
            <div class="stat-label">Repositories</div>
        </div>
        <div class="stat-card glass-card animate-card">
            <div class="stat-icon-wrap icon-followers">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="stat-value">${followers}</div>
            <div class="stat-label">Followers</div>
        </div>
        <div class="stat-card glass-card animate-card">
            <div class="stat-icon-wrap icon-following">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="stat-value">${following}</div>
            <div class="stat-label">Following</div>
        </div>
        <div class="stat-card glass-card animate-card" id="total-stars-card">
            <div class="stat-icon-wrap icon-stars">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div class="stat-value" id="total-stars-value">--</div>
            <div class="stat-label">Total Stars</div>
        </div>
    `;

    // Stagger stat card animations
    document.querySelectorAll('.animate-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
    });
};

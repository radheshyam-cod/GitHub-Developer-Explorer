import { animate, stagger } from 'https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm';

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

    // To calculate total stars properly we would need the repos data, but we can do it in the repoRenderer or pass it.
    // For now, we'll put a placeholder or just use what we have in userData (which doesn't have total stars).
    // Let's rely on repoRenderer to update the Stars stat or we calculate it here if we pass repos.
    // Since the prompt shows Stars, we can leave it empty and update it later or just show a default.
    // Wait, the search.js calls renderProfile(userData).
    
    // We will render 3 stats here, and the 4th (Stars) will be injected by repoRenderer, 
    // or we can just render the structure and give them IDs.
    statsContainer.innerHTML = `
        <div class="stat-card glass-card animate-card">
            <div class="stat-icon">📦</div>
            <div class="stat-value">${public_repos}</div>
            <div class="stat-label">Repositories</div>
        </div>
        <div class="stat-card glass-card animate-card">
            <div class="stat-icon">👥</div>
            <div class="stat-value">${followers}</div>
            <div class="stat-label">Followers</div>
        </div>
        <div class="stat-card glass-card animate-card">
            <div class="stat-icon">🫂</div>
            <div class="stat-value">${following}</div>
            <div class="stat-label">Following</div>
        </div>
        <div class="stat-card glass-card animate-card" id="total-stars-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-value" id="total-stars-value">--</div>
            <div class="stat-label">Total Stars</div>
        </div>
    `;

    // Framer motion animation
    animate('.profile-card', { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
    animate('.animate-card', { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: stagger(0.1) });
};

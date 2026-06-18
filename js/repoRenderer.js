import { getState, setState } from './state.js';
import { animate, stagger } from 'https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm';

const sorters = {
    stars: (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0),
    forks: (a, b) => (b.forks_count || 0) - (a.forks_count || 0),
    updated: (a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0),
    name: (a, b) => (a.name || '').localeCompare(b.name || ''),
};

const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Shell: '#89e051',
    default: '#8B5CF6'
};

function formatDate(isoString) {
    if (!isoString) return 'Not Available';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

function renderCard(repo) {
    const name = escapeHtml(repo.name);
    const description = escapeHtml(repo.description || 'No description provided for this repository.');
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const language = repo.language ? escapeHtml(repo.language) : null;
    const updatedAt = formatDate(repo.updated_at);
    const url = repo.html_url || `https://github.com/${repo.full_name}`;
    const visibility = repo.visibility || (repo.private ? 'Private' : 'Public');
    
    const langColor = language ? (langColors[language] || langColors.default) : 'transparent';

    return `
        <a class="repo-card glass-card repo-anim" href="${url}" target="_blank" rel="noopener noreferrer">
            <div class="repo-header">
                <h3 class="repo-name">${name}</h3>
                <span class="repo-visibility">${visibility}</span>
            </div>
            <p class="repo-desc">${description}</p>
            <div class="repo-footer">
                <div class="repo-stats">
                    ${language ? `
                    <div class="lang-badge">
                        <span class="lang-dot" style="background-color: ${langColor}"></span>
                        <span>${language}</span>
                    </div>` : ''}
                    <div class="repo-stat-item">⭐ ${stars}</div>
                    <div class="repo-stat-item">🍴 ${forks}</div>
                </div>
                <div>Updated ${updatedAt}</div>
            </div>
        </a>
    `;
}

function populateLanguageFilter(repos) {
    const filterSelect = document.getElementById('filter-select');
    if (!filterSelect) return;
    
    // Get unique languages
    const languages = new Set();
    repos.forEach(repo => {
        if (repo.language) languages.add(repo.language);
    });
    
    const sortedLangs = Array.from(languages).sort();
    
    let optionsHTML = '<option value="all">All Languages ▼</option>';
    sortedLangs.forEach(lang => {
        optionsHTML += `<option value="${escapeHtml(lang)}">${escapeHtml(lang)} ▼</option>`;
    });
    
    // Retain current filter if it exists
    const currentFilter = filterSelect.value;
    filterSelect.innerHTML = optionsHTML;
    
    if (sortedLangs.includes(currentFilter)) {
        filterSelect.value = currentFilter;
    } else {
        filterSelect.value = 'all';
    }
}

export const renderRepos = () => {
    const { repos, sortKey } = getState();
    const container = document.getElementById('repos-container');
    const filterSelect = document.getElementById('filter-select');
    
    if (!container) return;

    if (!Array.isArray(repos) || repos.length === 0) {
        container.innerHTML = '';
        return;
    }

    // Update total stars
    const totalStarsValueEl = document.getElementById('total-stars-value');
    if (totalStarsValueEl) {
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        totalStarsValueEl.textContent = totalStars;
    }

    // Filter by language
    const selectedLang = filterSelect ? filterSelect.value : 'all';
    let filteredRepos = repos;
    if (selectedLang !== 'all') {
        filteredRepos = repos.filter(r => r.language === selectedLang);
    }

    const sorted = [...filteredRepos].sort(sorters[sortKey] || sorters.stars);
    container.innerHTML = sorted.map(renderCard).join('');
    
    // Animate the repository cards
    animate('.repo-anim', { opacity: [0, 1], y: [20, 0] }, { duration: 0.4, delay: stagger(0.05) });
};

export const initRepoSorting = () => {
    const sortSelect = document.getElementById('sort-select');
    const filterSelect = document.getElementById('filter-select');
    const { repos } = getState();
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            setState({ sortKey: e.target.value });
            renderRepos();
        });
    }
    
    if (filterSelect) {
        populateLanguageFilter(repos);
        filterSelect.addEventListener('change', () => {
            renderRepos();
        });
    }
};

export const clearRepos = () => {
    const container = document.getElementById('repos-container');
    if (container) {
        container.innerHTML = '';
    }
    const filterSelect = document.getElementById('filter-select');
    if (filterSelect) {
        filterSelect.innerHTML = '<option value="all">All Languages ▼</option>';
    }
};

export const clearChart = () => {
    const chartArea = document.querySelector('.chart-area');
    if (chartArea) {
        chartArea.innerHTML = '<canvas id="language-chart"></canvas>';
    }
};

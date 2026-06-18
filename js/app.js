import { initSearch } from './search.js';
import { getState } from './state.js';
import { setRateLimitRemaining } from './rateLimit.js';

document.addEventListener('DOMContentLoaded', () => {
    initSearch();

    const input = document.getElementById('search-input');
    if (input) {
        const { lastSearchedUsername } = getState();
        if (lastSearchedUsername) {
            input.value = lastSearchedUsername;
        }
    }

    const { rateLimitRemaining } = getState();
    if (rateLimitRemaining !== null) {
        setRateLimitRemaining(rateLimitRemaining);
    }

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    themeBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            htmlEl.classList.add('light');
            themeBtn.innerHTML = '<span class="theme-icon">🌙</span> Dark Mode';
        } else {
            htmlEl.classList.add('dark');
            htmlEl.classList.remove('light');
            themeBtn.innerHTML = '<span class="theme-icon">☀️</span> Light Mode';
        }
    });
});

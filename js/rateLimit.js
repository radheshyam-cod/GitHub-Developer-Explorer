/**
 * Inspects response headers to handle GitHub API rate limits.
 * @param {Response} response - The Fetch API response object.
 * @returns {string|null} - A user-friendly error message if rate limit is exceeded, else null.
 */
const remainingEl = () => document.getElementById('rate-limit-remaining');
const containerEl = () => document.getElementById('rate-limit-container');

export const setRateLimitRemaining = (remaining) => {
    if (!containerEl()) return;
    const num = parseInt(remaining, 10);
    if (Number.isNaN(num)) {
        containerEl().classList.add('hidden');
        return;
    }

    containerEl().classList.remove('hidden');
    if (remainingEl()) {
        remainingEl().textContent = String(num);
    }

    if (num === 0) {
        containerEl().classList.add('rate-limit-warn');
    } else {
        containerEl().classList.remove('rate-limit-warn');
    }
};

export const handleRateLimit = (response) => {
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    if (response.status === 403 && remaining === '0') {
        const resetDate = new Date(parseInt(reset, 10) * 1000);
        const resetTime = resetDate.toLocaleTimeString();
        return `API Rate limit exceeded. Please try again after ${resetTime}.`;
    }

    if (response.headers.has('X-RateLimit-Remaining')) {
        setRateLimitRemaining(remaining);
    }

    return null;
};

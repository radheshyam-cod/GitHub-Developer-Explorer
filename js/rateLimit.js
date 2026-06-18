/**
 * Inspects response headers to handle GitHub API rate limits.
 * @param {Response} response - The Fetch API response object.
 * @returns {string|null} - A user-friendly error message if rate limit is exceeded, else null.
 */
export const handleRateLimit = (response) => {
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    // Check if the user is rate limited (403 Forbidden with 0 remaining requests)
    if (response.status === 403 && remaining === '0') {
        const resetDate = new Date(parseInt(reset, 10) * 1000);
        const resetTime = resetDate.toLocaleTimeString();
        return `API Rate limit exceeded. Please try again after ${resetTime}.`;
    }

    return null;
};

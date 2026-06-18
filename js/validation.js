/**
 * Validates a GitHub username based on GitHub's constraints.
 * @param {string} username - The input username
 * @returns {object} { isValid: boolean, error: string|null, sanitized: string }
 */
export const validateUsername = (username) => {
    const trimmed = username.trim();
    
    if (!trimmed) {
        return { isValid: false, error: 'Username cannot be empty.' };
    }
    
    if (trimmed.length > 39) {
        return { isValid: false, error: 'Username is too long (maximum 39 characters).' };
    }
    
    // GitHub username constraints: alphanumeric and hyphens, no consecutive hyphens, no starting/ending with hyphen
    if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(trimmed)) {
        return { isValid: false, error: 'Invalid GitHub username format. Use alphanumeric characters or single hyphens.' };
    }
    
    return { isValid: true, error: null, sanitized: trimmed };
};

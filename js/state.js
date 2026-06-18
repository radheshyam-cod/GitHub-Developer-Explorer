const STORAGE_KEY = 'gh_dev_explorer_state';

const initialState = {
    currentUser: null,
    repos: [],
    sortKey: 'updated',
    rateLimitRemaining: null,
    lastSearchedUsername: '',
};

let state = { ...initialState };

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            state.lastSearchedUsername = parsed.lastSearchedUsername || '';
            if (parsed.rateLimitRemaining !== undefined) {
                state.rateLimitRemaining = parsed.rateLimitRemaining;
            }
        }
    } catch (e) {
        // Ignore parse errors
    }
}

loadFromStorage();

export const getState = () => state;

export const setState = (partial) => {
    state = { ...state, ...partial };

    if ('currentUser' in partial && partial.currentUser && typeof partial.currentUser.login === 'string') {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            saved.lastSearchedUsername = partial.currentUser.login;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        } catch (e) {
            // Ignore storage errors
        }
    }

    if ('rateLimitRemaining' in partial) {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            saved.rateLimitRemaining = partial.rateLimitRemaining;
            saved.rateLimitUpdatedAt = Date.now();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        } catch (e) {
            // Ignore storage errors
        }
    }
};

export const resetState = () => {
    state = { ...initialState, lastSearchedUsername: state.lastSearchedUsername };
};

export default state;

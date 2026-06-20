const STORAGE_KEY = 'gh_dev_explorer_state';

const initialState = {
    currentUser: null,
    repos: [],
    sortKey: 'updated',
    rateLimitRemaining: null,
    lastSearchedUsername: '',
};

let state = { ...initialState };
let persisted = {};

try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        persisted = JSON.parse(saved);
        state.lastSearchedUsername = persisted.lastSearchedUsername || '';
        if (persisted.rateLimitRemaining !== undefined) {
            state.rateLimitRemaining = persisted.rateLimitRemaining;
        }
    }
} catch (e) {
    // Ignore parse errors
}

export const getState = () => state;

export const setState = (partial) => {
    state = { ...state, ...partial };

    let changed = false;

    if ('currentUser' in partial && partial.currentUser?.login) {
        persisted.lastSearchedUsername = partial.currentUser.login;
        changed = true;
    }
    if ('rateLimitRemaining' in partial) {
        persisted.rateLimitRemaining = partial.rateLimitRemaining;
        changed = true;
    }

    if (changed) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
        } catch (e) {
            // Ignore storage errors
        }
    }
};

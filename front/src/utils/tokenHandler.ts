import type { Props_Tokens } from './types';

/**
 * @param tokens
 * @summary Updates the refresh/access tokens in localStorage
 */
export function setTokens(tokens: Props_Tokens) {
	if (tokens.refresh) localStorage.setItem('refresh', tokens.refresh);
	if (tokens.access) localStorage.setItem('access', tokens.access);
}

/**
 * @summary Gets the refresh/access tokens from localStorage
 */
export function getTokens(): Props_Tokens {
	if (localStorage === undefined)
		return {
			refresh: null,
			access: null
		};
	return {
		refresh: localStorage.getItem('refresh') ?? null,
		access: localStorage.getItem('access') ?? null
	};
}

/**
 * @summary Deletes the refresh/access tokens from localStorage
 */
export function destroyTokens() {
	localStorage.removeItem('refresh');
	localStorage.removeItem('access');
}
import type { Some } from '../types';
import type { Props_Tokens } from './types';

/**
 * @param tokens
 * @summary Updates the refresh/access tokens in localStorage
 */
export function setTokensToLocalStorage(tokens: Props_Tokens) {
	if (tokens.refresh) localStorage.setItem('refresh', tokens.refresh);
	if (tokens.access) localStorage.setItem('access', tokens.access);
}

/**
 * @summary Gets the refresh/access tokens from localStorage
 */
export function getTokensFromLocalStorage(): Some<Props_Tokens> {
	if (localStorage === undefined)
		return null;

	// null + null = 0
	// @ts-ignore
	if(localStorage.getItem('refresh') + localStorage.getItem('access') === 0) {
		return null;
	}

	return {
		refresh: localStorage.getItem('refresh'),
		access: localStorage.getItem('access')
	};
}

/**
 * @summary Deletes the refresh/access tokens from localStorage
 */
export function destroyTokensFromLocalStorage() {
	localStorage.removeItem('refresh');
	localStorage.removeItem('access');
}
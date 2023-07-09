import { HTTP_METHODS } from '../types';
import { createHeaders, createRequest } from '../service';
import { BACKEND_URL } from '../../consts';
import type { LoginResponse } from './types';
import type { Props_User } from '../../types';

export async function register(data: any) {
	return await createRequest<any, LoginResponse>(
		BACKEND_URL + 'users/register',
        data,
		HTTP_METHODS.POST,
		createHeaders({}, ['files+json'])
	);
}


export async function login(data: any) {
	return await createRequest<any, LoginResponse>(
		BACKEND_URL + 'users/login',
        data,
		HTTP_METHODS.POST,
		createHeaders({}, ['json'])
	);
}

export async function authenticate() {
	return await createRequest<null, Props_User>(
		BACKEND_URL + 'users/authenticate',
        null,
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function fetchUser(id: number) {
	return await createRequest<null, Props_User>(
		BACKEND_URL + 'users/' + id,
        null,
		HTTP_METHODS.GET,
		createHeaders({}, [])
	);
}
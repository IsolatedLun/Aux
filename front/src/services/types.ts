export enum HTTP_METHODS {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export type HeaderTypes = 'files' | 'json' | 'files+json' | 'auth';

export interface SuccessResponse<T> {
	data: T;
	status: number;
}

export interface ErrorResponse {
	status: number;
	response: {
		data: string | { detail: string };
	};
}
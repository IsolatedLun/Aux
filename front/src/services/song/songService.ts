import { HTTP_METHODS } from '../types';
import { createHeaders, createRequest } from '../service';
import type { Props_SongCard } from '../../components/Modules/SongCard/types';
import { BACKEND_URL } from '../../consts';
import type { Form_EditSong, Form_Song } from '../../components/Pages/Upload/types';
import type { LanguageRecord } from '../../types';


export async function getSongs() {
	return await createRequest<null, Props_SongCard[]>(
		BACKEND_URL + 'songs/',
        null,
		HTTP_METHODS.GET,
		createHeaders({}, [])
	);
}

export async function uploadSong(data: Form_Song) {
	return await createRequest<Form_Song, null>(
		BACKEND_URL + 'songs/upload',
        data,
		HTTP_METHODS.POST,
		createHeaders({}, ['files+json', 'auth'])
	);
}

export async function editSong(data: Form_EditSong) {
	return await createRequest<Form_EditSong, null>(
		BACKEND_URL + `songs/${data.id}/edit`,
        data,
		HTTP_METHODS.POST,
		createHeaders({}, ['files+json', 'auth'])
	);
}

export async function viewSong(id: number) {
	return await createRequest<null, null>(
		BACKEND_URL + 'songs/view/' + id,
        null,
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function deleteSong(id: number) {
	return await createRequest<null, null>(
		BACKEND_URL + 'songs/' + id + '/delete',
        null,
		HTTP_METHODS.DELETE,
		createHeaders({}, ['auth'])
	);
}

// ==========================================

export async function fetchLangugaeList() {
	return await createRequest<null, LanguageRecord[]>(
		BACKEND_URL + 'songs/langlist',
        null,
		HTTP_METHODS.GET,
		createHeaders({}, [])
	);
}

export async function fetchLanguageLyricsForSong(id: number, language: string) {
	return await createRequest<null, string>(
		BACKEND_URL + `songs/lyric/${id}/${language}`,
        null,
		HTTP_METHODS.GET,
		createHeaders({}, [])
	);
}

export async function fetchAllLanguageLyricsForSong(id: number) {
	return await createRequest<null, Record<string, string>>(
		BACKEND_URL + `songs/lyric/${id}/all`,
        null,
		HTTP_METHODS.GET,
		createHeaders({}, [])
	);
}
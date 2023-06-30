import { HTTP_METHODS } from '../types';
import { createHeaders, createRequest } from '../service';
import type { Props_SongCard } from '../../components/Modules/SongCard/types';
import { BACKEND_URL } from '../../consts';
import type { Form_Song } from '../../components/Pages/Upload/types';


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
		createHeaders({}, ['files+json'])
	);
}
import { HTTP_METHODS } from '../types';
import { createHeaders, createRequest } from '../service';
import type { Props_SongCard } from '../../components/Modules/SongCard/types';
import { BACKEND_URL } from '../../consts';


export async function getSongs() {
	return await createRequest<null, Props_SongCard[]>(
		BACKEND_URL + 'songs/',
        null,
		HTTP_METHODS.GET,
		createHeaders({}, [])
	);
}
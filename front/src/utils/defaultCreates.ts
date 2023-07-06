import type { Props_SongCard } from "../components/Modules/SongCard/types";
import type { Props_DataModel, Props_User } from "../types";

export function createDefaultModel(): Props_DataModel {
	return {
		id: -1,
		date_created: new Date().toDateString()
	};
}

export function createDefaultUser(): Props_User {
	return {
		...createDefaultModel(),
		
		username: 'Default User',
		profile: 'media/profiles/default.png',
		is_staff: false
	};
}

export function createDefaultSongCard(): Props_SongCard {
	return {
		...createDefaultModel(),

		user: createDefaultUser(),
		title: 'No song selected',
		thumbnail: 'media/thumbnails/default.png',
		audio: '',
		languages: [],
		likes: 0,
		dislikes: 0,
		views: 0
	}
} 

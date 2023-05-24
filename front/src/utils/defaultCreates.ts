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

		username: '',
		profile: 'https://yt3.googleusercontent.com/ytc/AGIKgqOx0UQaegbV4xKIx7pyjLxbIVaQxakK2ZZXZ5pDag=s176-c-k-c0x00ffffff-no-rj',
		is_staff: false
	};
}

export function createDefaultSongCard(): Props_SongCard {
	return {
		...createDefaultModel(),

		user: createDefaultUser(),
		title: 'Default title',
		thumbnail: 'https://i.ytimg.com/vi/FumQefCcn3s/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBzgWAAtAFigIMCAAQARhlIEIoTTAP&rs=AOn4CLCAVOl5_h0gv5zpx0X4qhitN-t-ag',
		likes: 0,
		dislikes: 0,
		views: 0
	}
} 

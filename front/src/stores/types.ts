import type { Props_SongCard } from "../components/Modules/SongCard/types";
import type { Props_User, Some } from "../types";
import type { Props_Tokens } from "../utils/types";

export interface SongStore_T {
    songs: Props_SongCard[],
    currentSong: Props_SongCard,
    i: number
}

export interface AuthStore_T {
    tokens: Props_Tokens,
    user: Some<Props_User>,
    
    isLogged: boolean
}
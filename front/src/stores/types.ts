import type { Props_User, Some } from "../types";
import type { Props_Tokens } from "../utils/types";

export interface SongStore_T {
    id: number;
    audio: string;
}

export interface AuthStore_T {
    tokens: Props_Tokens,
    user: Some<Props_User>,
    
    isLogged: boolean
}
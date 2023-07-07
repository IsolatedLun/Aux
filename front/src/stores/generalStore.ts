import { writable } from "svelte/store";
import type { AuthStore_T, GeneralStore_T } from "./types";
import type { Props_Tokens } from "../utils/types";
import type { Props_User } from "../types";
import { destroyTokensFromLocalStorage, getTokensFromLocalStorage, setTokensToLocalStorage } from "../utils/tokenHandler";
import type { LoginResponse } from "../services/auth/types";
import { authenticate } from "../services/auth/authService";

export function createAuthStore() {
    const store = writable<GeneralStore_T>({
        musicPlayerExpanded: false,
    });

    return {
        subscribe: store.subscribe,
        setMusicPlayerExpandedState: (bool: boolean) => store.update(_store => {
            _store.musicPlayerExpanded = bool;
            return _store;
        })
    }
}

export const generalStore = createAuthStore();
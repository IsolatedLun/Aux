import { writable } from "svelte/store";
import type { AuthStore_T } from "./types";
import type { Props_Tokens } from "../utils/types";
import type { Props_User } from "../types";
import { destroyTokensFromLocalStorage, getTokensFromLocalStorage, setTokensToLocalStorage } from "../utils/tokenHandler";
import type { LoginResponse } from "../services/auth/types";
import { authenticate } from "../services/auth/authService";

export function createAuthStore() {
    const store = writable<AuthStore_T>({
        user: null,
        isLogged: false,
    });

    return {
        subscribe: store.subscribe,
        setTokens: (tokens: Props_Tokens) => setTokensToLocalStorage(tokens),
        login: (user: Props_User) => store.update(_store => {            
            _store.user = user;
            _store.isLogged = true;

            return _store;
        }),
        logout: () => store.update(_store => {
            destroyTokensFromLocalStorage();
            
            _store.user = null;
            _store.isLogged = false;
            return _store;
        }),
    }
}

export const authStore = createAuthStore();
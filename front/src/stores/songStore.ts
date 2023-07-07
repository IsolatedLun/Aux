import { writable } from 'svelte/store';
import { createDefaultSongCard } from '../utils/defaultCreates';
import type { Props_SongCard } from '../components/Modules/SongCard/types';
import type { SongStore_T } from './types';
import type { Some } from '../types';

export function createSongStore() {
    const store = writable<SongStore_T>({
        songs: [],
        currentSong: createDefaultSongCard(),
        i: -1 
    });

    return {
        subscribe: store.subscribe,

        addSong: (song: Props_SongCard) => {
            let idx: number = -1;
            store.update(_store => {
                for(let i = 0; i < _store.songs.length; i++) {
                    if(_store.songs[i].id === song.id) {
                        idx = i;
                        return _store;
                    }
                }
                
                _store.songs.push(song);
                idx = _store.songs.length - 1;

                return _store;
            })

            return idx;
        },

        play: (i: number) => store.update(_store => {
            _store.i = i;
            _store.currentSong = _store.songs[i];

            return _store;
        }),
        next: () => store.update(_store => {
            if(_store.i + 1 < _store.songs.length)
                _store.i++;
            else
                _store.i = 0;

            _store.currentSong = _store.songs[_store.i];
            return _store;
        }),
        previous: () => store.update(_store => {       
            if(_store.i > 0)
                _store.i--;
            else 
                _store.i = _store.songs.length - 1;
            
            _store.currentSong = _store.songs[_store.i];
            return _store;
        }),
    }
}

export const songStore = createSongStore();
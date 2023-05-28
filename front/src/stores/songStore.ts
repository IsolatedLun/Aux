import { writable } from 'svelte/store';
import { createDefaultSongCard } from '../utils/defaultCreates';
import type { Props_SongCard } from '../components/Modules/SongCard/types';

export const songStore = writable<Props_SongCard>(createDefaultSongCard())
import type { Some } from "../types";

export interface Props_Tokens {
	refresh: Some<string>;
	access: Some<string>;
}

export type FileType = 'image' | 'audio' | 'any';
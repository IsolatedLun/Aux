import type { Some } from "../../../types";

export interface Form_Song {
    title: string;
    tags: string[];

    thumbnail: Some<File>;
    audio: Some<File>;
}
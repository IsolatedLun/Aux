import type { Some, Props_User } from "../../../types";

export interface Form_Song {
    title: string;
    tags: string[];
    lyrics: Record<string, Some<File>>,

    thumbnail: Some<File>;
    audio: Some<File>;

    user: Props_User;
}
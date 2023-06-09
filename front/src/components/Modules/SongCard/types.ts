import type { Props_DataModel, Props_User } from "../../../types";

export interface Props_SongCardContext {
    getCardShape: () => SongCardShapeEnum;
}

export interface Props_SongCard extends Props_DataModel {
    user: Props_User,
    title: string,
    tags: string[],
    thumbnail: string,
    audio: string,

    languages: string[],

    views: number,
    likes: number,
    dislikes: number
}

export enum SongCardShapeEnum {
    COMPACT_H,
    COMPACT_Y,

    SPACIOUS
}
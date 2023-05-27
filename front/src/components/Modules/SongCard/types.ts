import type { Props_DataModel, Props_User } from "../../../types";

export interface Props_SongCard extends Props_DataModel {
    user: Props_User;
    title: string;
    thumbnail: string;

    views: number;
    likes: number;
    dislikes: number;
}

export enum SongCardShapeEnum {
    COMPACT_H,
    COMPACT_Y,

    SPACIOUS
}
import type { Enum, Some } from "../types";
import type { FileType } from "./types";

export function filterEnumByNumbers(_enum: Enum) {
    return Object.values(_enum).filter(x => typeof(x) === 'number');
}

export function isFileTypeOf(type: FileType, file: Some<File>) {
    return file && file.type.startsWith(type);
}
import type { Form_Song } from "../../components/Pages/Upload/types";
import type { Some } from "../../types";
import { isFileTypeOf } from "../general";
import type { FileType } from "../types";
import type { FormValidatorFn } from "./types";

export function runFormValidators(validators: FormValidatorFn[]) {
    for(let i = 0; i < validators.length; i++) {
        const validatorResult = validators[i]();
        if(typeof(validatorResult) === 'string')
            return validatorResult;
    }

    return true;
}

// ===============================================================
// Validaton Functions
export function minLength_V(key: string, data: string | any[], n: number) {
    const dataType = Array.isArray(data) ? 'item(s)' : 'character(s)';
    return data.length >= n ? true : `${key} must have atleast ${n} ${dataType}`;
}

export function maxLength_V(key: string, data: string | any[], n: number) {
    const dataType = Array.isArray(data) ? 'item(s)' : 'character(s)';
    return data.length <= n ? true : `${key} cannot have more than ${n} ${dataType}`;
}

export function fileType_V(key: string, data: Some<File>, type: FileType) {
    return isFileTypeOf(type, data) ? true : `${key} field must be an ${type} file`;
}

// ===============================================================
// Custom Form Validators
export function validateUploadForm(form: Form_Song) {
    const validators: FormValidatorFn[] = [
        () => minLength_V('Title', form.title, 1),
        () => maxLength_V('Title', form.title, 64),
        () => minLength_V('Tags', form.tags, 1),
        () => fileType_V('Audio', form.audio, 'audio'),
        () => fileType_V('Thumbnail', form.thumbnail, 'image'),
    ]

    return runFormValidators(validators);
}
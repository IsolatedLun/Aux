import type { LoginForm, SignUpForm } from "../../components/Pages/Auth/types";
import type { EditUserForm } from "../../components/Pages/Settings/types";
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

export function orNull<T>(data: Some<T>, fn: () => any) {
    if(data)
        return fn()
    return true;
};

// ========================================
const MIN_USERNAME_LEN = 1;
const MAX_USERNAME_LEN = 256;
const MIN_EMAIL_LEN = 3;
const MAX_EMAIL_LEN = 254;
const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 64;

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

export function validateEditSongForm(form: Form_Song) {
    const validators: FormValidatorFn[] = [
        () => minLength_V('Title', form.title, 1),
        () => maxLength_V('Title', form.title, 64),
    ]

    return runFormValidators(validators);
}

export function validateLoginForm(form: LoginForm) {
    const validators: FormValidatorFn[] = [
        () => minLength_V('Email address', form.emailAddress, MIN_EMAIL_LEN),
        () => maxLength_V('Email address', form.emailAddress, MAX_EMAIL_LEN),
        () => minLength_V('Password', form.password, MIN_PASSWORD_LEN),
        () => maxLength_V('Password', form.password, MAX_PASSWORD_LEN),
    ]

    return runFormValidators(validators);
}

export function validateSignUpForm(form: SignUpForm) {
    const validators: FormValidatorFn[] = [
        () => minLength_V('Username', form.username, MIN_USERNAME_LEN),
        () => maxLength_V('Username', form.username, MAX_USERNAME_LEN),
        () => minLength_V('Email address', form.emailAddress, MIN_EMAIL_LEN),
        () => maxLength_V('Email address', form.emailAddress, MAX_EMAIL_LEN),
        () => minLength_V('Password', form.password, MIN_PASSWORD_LEN),
        () => maxLength_V('Password', form.password, MAX_PASSWORD_LEN),
        () => fileType_V('Profile', form.profile, 'image'),
    ]

    return runFormValidators(validators);
}

export function validateEditUserForm(form: EditUserForm) {
    const validators: FormValidatorFn[] = [
        () => minLength_V('Username', form.username, MIN_USERNAME_LEN),
        () => maxLength_V('Username', form.username, MAX_USERNAME_LEN),
        () => minLength_V('newPassword', form.newPassword, 0),
        () => maxLength_V('newPassword', form.newPassword, MAX_PASSWORD_LEN),
        () => orNull(form.profile, () => fileType_V('Profile', form.profile, 'image')),
    ]

    return runFormValidators(validators);
}
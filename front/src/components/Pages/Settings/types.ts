import type { Some } from "../../../types";

export interface EditUserForm {
    username: string,
    newPassword: string,

    profile: Some<File>
}
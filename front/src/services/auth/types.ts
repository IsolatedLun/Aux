import type { Props_User } from "../../types";
import type { Props_Tokens } from "../../utils/types";

export interface LoginResponse {
    tokens: Props_Tokens,
    user: Props_User
}
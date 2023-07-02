export interface LoginForm {
    emailAddress: string,
    password: string
}

export interface SignUpForm extends LoginForm {
    username: string,
    profile: Some<File>
}
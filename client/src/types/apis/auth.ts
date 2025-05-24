import type { ResetPasswordFormType } from "../pages/auth"

type UserRoleType = "employee" | "admin"

type SignInDataType = {
    email: string
    password: string
}

interface SignUpDataType extends SignInDataType{
    role: UserRoleType
}

interface APIResponseType<T>{
    status: number
    data: T
}

type ForgotPasswordType = {
    email: string
}

interface ResetPasswordType extends ResetPasswordFormType{

};

export type {
    SignUpDataType,
    UserRoleType,
    APIResponseType,
    SignInDataType,
    ForgotPasswordType,
    ResetPasswordType
}
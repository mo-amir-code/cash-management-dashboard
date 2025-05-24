

interface SignInFormType {
    email: string
    password: string
}

interface ForgotPasswordFormType {
    email: string
}

interface ResetPasswordFormType {
    otp: number
    newPassword: string
}

interface VeirfyOTPFormType {
    otp: number
}


export type {
    SignInFormType,
    ForgotPasswordFormType,
    VeirfyOTPFormType,
    ResetPasswordFormType
}
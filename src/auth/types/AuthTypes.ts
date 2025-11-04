
export interface AuthUser {
    id: string
    email: string
    name: string
    password: string
    createdDate: string
}

export interface AuthConfig {
    enableLogin: boolean
    enableRegister: boolean
}

export interface AuthResponse {
    success: boolean
    message: string
    user?: AuthUser
}

import { AuthUser, AuthConfig } from '../types/AuthTypes'

export default class AuthModel {
    private users: AuthUser[] = []
    private currentUser: AuthUser | null = null
    private enableLogin: boolean = true
    private enableRegister: boolean = true

    getConfig(): AuthConfig {
        return {
            enableLogin: this.enableLogin,
            enableRegister: this.enableRegister
        }
    }

    register(email: string, name: string, password: string): { success: boolean; message: string } {
        if (!this.enableRegister) {
            return { success: false, message: 'Registro deshabilitado' }
        }

        if (this.users.find(u => u.email === email)) {
            return { success: false, message: 'El email ya está registrado' }
        }

        const newUser: AuthUser = {
            id: Date.now().toString(),
            email,
            name,
            password,
            createdDate: new Date().toISOString().split('T')[0] as string
        }

        this.users.push(newUser)
        this.currentUser = newUser
        return { success: true, message: 'Registro exitoso' }
    }

    login(email: string, password: string): { success: boolean; message: string; user?: AuthUser } {
        if (!this.enableLogin) {
            return { success: false, message: 'Login deshabilitado' }
        }

        const user = this.users.find(u => u.email === email && u.password === password)

        if (!user) {
            return { success: false, message: 'Credenciales inválidas' }
        }

        this.currentUser = user
        return { success: true, message: 'Login exitoso', user }
    }

    logout(): void {
        this.currentUser = null
    }

    getCurrentUser(): AuthUser | null {
        return this.currentUser
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null
    }
}
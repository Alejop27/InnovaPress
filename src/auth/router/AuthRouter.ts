
import { Router } from 'express'
import AuthView from '../view/AuthView'

export default class AuthRouter {
    public readonly router: Router

    constructor(private view: AuthView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/auth', this.view.render)
        this.router.post('/api/auth/register', this.view.register)
        this.router.post('/api/auth/login', this.view.login)
        this.router.post('/api/auth/logout', this.view.logout)
    }
}
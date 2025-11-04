
import { Router } from 'express'
import AuthView from '../view/AuthView'

export default class AuthRouter {
    public readonly router: Router

    constructor(private view: AuthView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/auth', (req, res) => this.view.render(req, res))
        this.router.post('/api/auth/register', (req, res) => this.view.register(req, res))
        this.router.post('/api/auth/login', (req, res) => this.view.login(req, res))
        this.router.post('/api/auth/logout', (req, res) => this.view.logout(req, res))
    }
}
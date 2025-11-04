import { Router } from 'express'
import HeaderView from '../view/HeaderView'
import HeaderModel from '../model/HeaderModel'

export default class HeaderRouter {
    public readonly router: Router

    constructor(private model: HeaderModel, private view: HeaderView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/header', (req, res) => this.view.render(req, res))
        this.router.get('/header/partial', (req, res) => this.view.renderPartial(req, res))

        this.router.post('/header/login', (_req, res) => {
            res.json({ success: true, message: 'Login realizado' })
        })

        this.router.post('/header/logout', (_req, res) => {
            this.model.setCurrentUser(null)
            res.json({ success: true, message: 'Sesión cerrada' })
        })
    }
}
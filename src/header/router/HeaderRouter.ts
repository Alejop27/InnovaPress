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
        this.router.get('/header', this.view.render)
        this.router.get('/header/partial', this.view.renderPartial)

        this.router.post('/header/login', (req, res) => {
            const { email, password } = req.body
            res.json({ success: true, message: 'Login realizado' })
        })

        this.router.post('/header/logout', (req, res) => {
            this.model.setCurrentUser(null)
            res.json({ success: true, message: 'Sesión cerrada' })
        })
    }
}
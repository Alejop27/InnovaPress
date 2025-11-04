
import { Router } from 'express'
import FooterView from '../view/FooterView'

export default class FooterRouter {
    public readonly router: Router

    constructor(private view: FooterView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/footer', (req, res) => this.view.render(req, res))
        this.router.get('/footer/partial', (req, res) => this.view.renderPartial(req, res))
    }
}
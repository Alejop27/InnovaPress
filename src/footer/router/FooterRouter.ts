
import { Router } from 'express'
import FooterView from '../view/FooterView'

export default class FooterRouter {
    public readonly router: Router

    constructor(private view: FooterView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/footer', this.view.render)
        this.router.get('/footer/partial', this.view.renderPartial)
    }
}
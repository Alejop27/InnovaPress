
import { Router } from 'express'
import HeroView from '../view/HeroView'

export default class HeroRouter {
    public readonly router: Router

    constructor(private view: HeroView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/hero', this.view.render)
        this.router.get('/hero/partial', this.view.renderPartial)
    }
}

import { Router } from 'express'
import HeroView from '../view/HeroView'

export default class HeroRouter {
    public readonly router: Router

    constructor(private view: HeroView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/hero', (req, res) => this.view.render(req, res))
        this.router.get('/hero/partial', (req, res) => this.view.renderPartial(req, res))
    }
}
import { Router } from 'express'
import NewsGridView from '../view/NewsGridView'

export default class NewsGridRouter {
    public readonly router: Router

    constructor(private view: NewsGridView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/', this.view.render)
        this.router.get('/grid', this.view.render)
        this.router.get('/grid/partial', this.view.renderPartial)
    }
}
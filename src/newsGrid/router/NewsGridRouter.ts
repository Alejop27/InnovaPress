import { Router } from 'express'
import NewsGridView from '../view/NewsGridView'

export default class NewsGridRouter {
    public readonly router: Router

    constructor(private view: NewsGridView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/', (_req, res) => res.render('/grid'))
        this.router.get('/grid', (req, res) => this.view.render(req, res))
        this.router.get('/grid/partial', (req, res) => this.view.renderPartial(req, res))
    }
}
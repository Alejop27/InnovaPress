
import { Router } from 'express'
import PaginationView from '../view/PaginationView'

export default class PaginationRouter {
    public readonly router: Router

    constructor(private view: PaginationView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/pagination', (req, res) => this.view.render(req, res))
        this.router.get('/pagination/partial', (req, res) => this.view.renderPartial(req, res))
    }
}
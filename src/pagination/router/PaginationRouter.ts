
import { Router } from 'express'
import PaginationView from '../view/PAginationView'

export default class PaginationRouter {
    public readonly router: Router

    constructor(private view: PaginationView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/pagination', this.view.render)
        this.router.get('/pagination/partial', this.view.renderPartial)
    }
}
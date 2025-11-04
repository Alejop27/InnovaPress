import { Router } from 'express'
import CategoriesView from '../view/CategoriesView'

export default class CategoriesRouter {
    public readonly router: Router

    constructor(private view: CategoriesView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/categorias', this.view.render)
        this.router.get('/categorias/partial', this.view.renderPartial)
    }
}
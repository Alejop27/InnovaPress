import { Router } from 'express'
import CategoriesView from '../view/CategoriesView'

export default class CategoriesRouter {
    public readonly router: Router

    constructor(private view: CategoriesView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/categorias', (req, res) => this.view.render(req, res))
        this.router.get('/categorias/partial', (req, res) => this.view.renderPartial(req, res))
    }
}

import { Router } from 'express'
import SearchBarView from '../view/SearchBarView'

export default class SearchBarRouter {
    public readonly router: Router

    constructor(private view: SearchBarView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/search', (req, res) => this.view.render(req, res))
        this.router.get('/api/search', (req, res) => this.view.search(req, res))
    }
}
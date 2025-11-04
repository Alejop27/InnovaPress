
import { Router } from 'express'
import SearchBarView from '../view/SearchBarView'

export default class SearchBarRouter {
    public readonly router: Router

    constructor(private view: SearchBarView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/search', this.view.render)
        this.router.get('/api/search', this.view.search)
    }
}
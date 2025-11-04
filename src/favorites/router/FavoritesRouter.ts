
import { Router } from 'express'
import FavoritesView from '../view/FavoritesView'

export default class FavoritesRouter {
    public readonly router: Router

    constructor(private view: FavoritesView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/favoritos', this.view.render)
        this.router.get('/favoritos/partial', this.view.renderPartial)
        this.router.post('/api/favoritos/add', this.view.addFavorite)
        this.router.post('/api/favoritos/remove', this.view.removeFavorite)
    }
}
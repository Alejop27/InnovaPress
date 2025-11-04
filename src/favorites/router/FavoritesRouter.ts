
import { Router } from 'express'
import FavoritesView from '../view/FavoritesView'

export default class FavoritesRouter {
    public readonly router: Router

    constructor(private view: FavoritesView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/favoritos', (req, res) => this.view.render(req, res))
        this.router.get('/favoritos/partial', (req, res) => this.view.renderPartial(req, res))
        this.router.post('/api/favoritos/add', (req, res) => this.view.addFavorite(req, res))
        this.router.post('/api/favoritos/remove', (req, res) => this.view.removeFavorite(req, res))
    }
}
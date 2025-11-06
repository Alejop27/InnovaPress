import { Router, Request, Response } from 'express'
import FavoritesView from '../view/FavoritesView'

export default class FavoritesRouter {
    private view: FavoritesView
    public router: Router

    constructor(view: FavoritesView) {
        this.view = view
        this.router = Router()
        this.setupRoutes()
    }

    private setupRoutes(): void {
        this.router.get('/api/favorites', (_req: Request, res: Response): void => {
            res.json({ success: true, data: this.view.getFavorites() })
        })

        this.router.post('/api/favorites/:id', (req: Request, res: Response): void => {
            const newsId = req.params['id']!
            const added = this.view.addFavorite(newsId)
            res.json({ success: true, added })
        })

        this.router.delete('/api/favorites/:id', (req: Request, res: Response): void => {
            const newsId = req.params['id']!
            const removed = this.view.removeFavorite(newsId)
            res.json({ success: true, removed })
        })
    }

    getRouter() {
        return this.router
    }
}

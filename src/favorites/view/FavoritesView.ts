// src/favorites/view/FavoritesView.ts

import { Request, Response } from 'express'
import FavoritesModel from '../model/FavoritesModel'

export default class FavoritesView {
    constructor(private model: FavoritesModel) { }

    render(req: Request, res: Response): void {
        try {
            const userId = ((req as any).session as any)?.userId || 'user-1'  
            this.model.loadUserFavorites(userId)

            const config = this.model.getConfig()
            res.render('favorites/favorites', { config })
        } catch (error) {
            console.error('Error en FavoritesView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial(req: Request, res: Response): void {
        try {
            const userId = ((req as any).session as any)?.userId || 'user-1' 
            this.model.loadUserFavorites(userId)

            const config = this.model.getConfig()
            res.json({ success: true, data: config })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    addFavorite(req: Request, res: Response): void {
        try {
            const { newsId } = req.body
            const userId = ((req as any).session as any)?.userId || 'user-1'  
            this.model.loadUserFavorites(userId)
            this.model.addToFavorites(newsId)

            res.json({ success: true, message: 'Agregado a favoritos' })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    removeFavorite(req: Request, res: Response): void {
        try {
            const { newsId } = req.body
            const userId = ((req as any).session as any)?.userId || 'user-1'  
            this.model.loadUserFavorites(userId)
            this.model.removeFromFavorites(newsId)

            res.json({ success: true, message: 'Eliminado de favoritos' })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}

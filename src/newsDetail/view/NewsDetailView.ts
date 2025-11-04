
import { Request, Response } from 'express'
import NewsDetailModel from '../model/NewsDetailModel'

export default class NewsDetailView {
    constructor(private model: NewsDetailModel) { }

    render(req: Request, res: Response): void {
        try {
            const { id } = req.params
            const news = this.model.loadNews(id!) 

            if (!news) {
                return res.status(404).render('error/404', {
                    message: 'Noticia no encontrada'
                })
            }

            res.render('newsDetail/newsDetail', { news })
        } catch (error) {
            console.error('Error en NewsDetailView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial(req: Request, res: Response): void {
        try {
            const { id } = req.params
            const news = this.model.loadNews(id!) 

            res.json({ success: !!news, data: news })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    like(req: Request, res: Response): void {
        try {
            const { id } = req.params
            this.model.addLike(id!) 
            res.json({ success: true, message: 'Like agregado' })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    addComment(req: Request, res: Response): void {
        try {
            const { id } = req.params
            const { author, text } = req.body
            this.model.addComment(id!, author, text) 
            res.json({ success: true, message: 'Comentario agregado' })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
import { Router, Request, Response } from 'express'
import NewsDetailView from '../view/NewsDetailView'

export default class NewsDetailRouter {
    private view: NewsDetailView
    public router: Router

    constructor(view: NewsDetailView) {
        this.view = view
        this.router = Router()
        this.setupRoutes()
    }

    private setupRoutes(): void {
        // ✅ GET - Obtener detalle de noticia
        this.router.get('/noticia/:id', (req: Request, res: Response): void => {
            try {
                const newsId = req.params['id']!
                const news = this.view.loadNews(newsId)

                if (!news) {
                    res.status(404).json({ success: false, message: 'Noticia no encontrada' })
                    return
                }

                res.json({ success: true, news })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error al cargar noticia' })
            }
        })

        // ✅ POST - Agregar like
        this.router.post('/noticia/:id/like', (_req: Request, res: Response): void => {
            try {
                const success = this.view.addLike()

                if (!success) {
                    res.status(404).json({ success: false, message: 'Error al agregar like' })
                    return
                }

                res.json({ success: true, message: 'Like agregado' })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error al agregar like' })
            }
        })


        // ✅ POST - Agregar comentario
        this.router.post('/noticia/:id/comment', (req: Request, res: Response): void => {
            try {
                const { author, text } = req.body

                if (!author || !text) {
                    res.status(400).json({ success: false, message: 'Faltan campos' })
                    return
                }

                const success = this.view.addComment(author, text)

                if (!success) {
                    res.status(404).json({ success: false, message: 'Error al agregar comentario' })
                    return
                }

                res.json({ success: true, message: 'Comentario agregado' })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error al agregar comentario' })
            }
        })
    }

    getRouter() {
        return this.router
    }
}

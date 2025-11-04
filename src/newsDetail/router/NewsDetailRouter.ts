
import { Router } from 'express'
import NewsDetailView from '../view/NewsDetailView'

export default class NewsDetailRouter {
    public readonly router: Router

    constructor(private view: NewsDetailView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/noticia/:id', this.view.render)
        this.router.get('/noticia/:id/partial', this.view.renderPartial)
        this.router.post('/noticia/:id/like', this.view.like)
        this.router.post('/noticia/:id/comment', this.view.addComment)
    }
}
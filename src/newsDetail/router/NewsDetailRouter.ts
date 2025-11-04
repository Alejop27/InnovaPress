
import { Router } from 'express'
import NewsDetailView from '../view/NewsDetailView'

export default class NewsDetailRouter {
    public readonly router: Router

    constructor(private view: NewsDetailView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/noticia/:id', (req, res) => this.view.render(req, res))
        this.router.get('/noticia/:id/partial', (req, res) => this.view.renderPartial(req, res))
        this.router.post('/noticia/:id/like', (req, res) => this.view.like(req, res))
        this.router.post('/noticia/:id/comment', (req, res) => this.view.addComment(req, res))
    }
}
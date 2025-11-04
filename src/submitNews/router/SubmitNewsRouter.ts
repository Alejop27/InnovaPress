
import { Router } from 'express'
import SubmitNewsView from '../view/SubmitNewsView'

export default class SubmitNewsRouter {
    public readonly router: Router

    constructor(private view: SubmitNewsView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/submit-news', (req, res) => this.view.render(req, res))
        this.router.post('/api/submit-news', (req, res) => this.view.submit(req, res))
        this.router.get('/submit-news/partial', (req, res) => this.view.renderPartial(req, res))
    }
}

import { Router } from 'express'
import SubmitNewsView from '../view/SubmitNewsView'

export default class SubmitNewsRouter {
    public readonly router: Router

    constructor(private view: SubmitNewsView) {
        this.router = Router()
        this.configureRoutes()
    }

    private configureRoutes(): void {
        this.router.get('/submit-news', this.view.render)
        this.router.post('/api/submit-news', this.view.submit)
        this.router.get('/submit-news/partial', this.view.renderPartial)
    }
}
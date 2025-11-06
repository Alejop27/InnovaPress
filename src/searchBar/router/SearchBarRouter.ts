import { Router, Request, Response } from 'express'
import SearchBarView from '../view/SearchBarView'

export default class SearchBarRouter {
    private view: SearchBarView
    public router: Router

    constructor(view: SearchBarView) {
        this.view = view
        this.router = Router()
        this.setupRoutes()
    }

    private setupRoutes(): void {
        this.router.get('/search', (req: Request, res: Response): void => {
            const query = req.query['q'] as string || ''
            const results = this.view.search(query)
            res.json({ success: true, results, count: results.length })
        })
    }

    getRouter() {
        return this.router
    }
}

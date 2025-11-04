import { Request, Response } from 'express'
import NewsGridModel from '../model/NewsGridModel'

export default class NewsGridView {
    constructor(private model: NewsGridModel) { }

    render(req: Request, res: Response): void {
        try {
            const page = req.query['page'] ? parseInt(req.query['page'] as string) : 1
            const category = req.query['category'] as string || 'all'

            this.model.setCategory(category)
            this.model.setCurrentPage(page)

            const config = this.model.getConfig()
            const news = this.model.getGridNews(page)
            const totalPages = this.model.getTotalPages()

            res.render('newsGrid/newsGrid', {
                config,
                news,
                currentPage: page,
                totalPages,
                selectedCategory: category
            })
        } catch (error) {
            console.error('Error en NewsGridView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial(req: Request, res: Response): void {
        try {
            const page = req.query['page'] ? parseInt(req.query['page'] as string) : 1
            const news = this.model.getGridNews(page)
            const totalPages = this.model.getTotalPages()

            res.json({
                success: true,
                data: { news, totalPages, currentPage: page }
            })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
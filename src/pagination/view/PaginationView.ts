
import { Request, Response } from 'express'
import PaginationModel from '../model/PaginationModel'

export default class PaginationView {
    constructor(private model: PaginationModel) { }

    render(_req: Request, res: Response): void  {
        try {
            const config = this.model.getConfig()
            const data = this.model.getPaginationData()
            const pageNumbers = this.model.getPageNumbers()

            res.render('pagination/pagination', {
                config,
                data,
                pageNumbers,
                currentPage: this.model.getConfig().currentPage
            })
        } catch (error) {
            console.error('Error en PaginationView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial (_req: Request, res: Response): void {
        try {
            const config = this.model.getConfig()
            const data = this.model.getPaginationData()
            const pageNumbers = this.model.getPageNumbers()

            res.json({ success: true, data: { config, data, pageNumbers } })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
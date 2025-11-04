
import { Request, Response } from 'express'
import SearchBarModel from '../model/SearchBarModel'

export default class SearchBarView {
    constructor(private model: SearchBarModel) { }

    render = (_req: Request, res: Response): void => {
        try {
            const config = this.model.getConfig()
            const filters = this.model.getFilters()

            res.render('searchBar/searchBar', { config, filters })
        } catch (error) {
            console.error('Error en SearchBarView:', error)
            res.status(500).send('Error')
        }
    }

    search = (req: Request, res: Response): void => {
        try {
            const { query } = req.query
            const results = this.model.search(query as string)

            res.json({ success: true, data: results })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
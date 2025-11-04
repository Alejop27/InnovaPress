
import { Request, Response } from 'express'
import CategoriesModel from '../model/CategoriesModel'

export default class CategoriesView {
    constructor(private model: CategoriesModel) { }

    render = (req: Request, res: Response): void => {
        try {
            const { category } = req.query
            if (category) {
                this.model.setSelectedCategory(category as string)
            }

            const config = this.model.getConfig()
            res.render('categories/categories', { config })
        } catch (error) {
            console.error('Error en CategoriesView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial = (_req: Request, res: Response): void => {
        try {
            const categories = this.model.getCategories()
            res.json({ success: true, data: categories })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
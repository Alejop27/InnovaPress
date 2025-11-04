import { Request, Response } from 'express'
import HeroModel from '../model/HeroModel'

export default class HeroView {
    constructor(private model: HeroModel) { }

    render = (_req: Request, res: Response): void => {
        try {
            const config = this.model.getConfig()
            res.render('hero/hero', { config })
        } catch (error) {
            console.error('Error en HeroView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial = (_req: Request, res: Response): void => {
        try {
            const config = this.model.getConfig()
            res.json({ success: true, data: config })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
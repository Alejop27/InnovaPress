
import { Request, Response } from 'express'
import FooterModel from '../model/FooterModel'

export default class FooterView {
    constructor(private model: FooterModel) { }

    render (_req: Request, res: Response): void {
        try {
            const config = this.model.getConfig()
            res.render('footer/footer', { config })
        } catch (error) {
            console.error('Error en FooterView:', error)
            res.status(500).send('Error')
        }
    }

    renderPartial (_req: Request, res: Response): void  {
        try {
            const config = this.model.getConfig()
            res.json({ success: true, data: config })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
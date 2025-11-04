
import { Request, Response } from 'express'
import SubmitNewsModel from '../model/SubmitNewsModel'

export default class SubmitNewsView {
    constructor(private model: SubmitNewsModel) { }

    render = (_req: Request, res: Response): void => {
        try {
            const config = this.model.getConfig()
            res.render('submitNews/submitNews', { config })
        } catch (error) {
            console.error('Error en SubmitNewsView:', error)
            res.status(500).send('Error')
        }
    }

    submit  (req: Request, res: Response): void  {
        try {
            const { name, email, subject, newsInfo } = req.body
            const image = (req as any).file?.filename || undefined

            const form = {
                name,
                email,
                subject,
                newsInfo,
                image
            }

            const result = this.model.submitForm(form)
            res.json(result)
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    renderPartial  (_req: Request, res: Response): void  {
        try {
            const config = this.model.getConfig()
            res.json({ success: true, data: config })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
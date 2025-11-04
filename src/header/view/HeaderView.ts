import { Request, Response } from 'express'
import HeaderModel from '../model/HeaderModel'

export default class HeaderView {
    constructor(private model: HeaderModel) { }

    render (req: Request, res: Response): void  {
        try {
            const config = this.model.getConfig()
            const currentUser = this.model.getCurrentUser()

            res.render('header/header', {
                config,
                currentUser,
                isLoggedIn: this.model.isUserLoggedIn(),
                currentPath: req.path
            })
        } catch (error) {
            console.error('Error en HeaderView:', error)
            res.status(500).send('Error en el servidor')
        }
    }

    renderPartial  (_req: Request, res: Response): void  {
        try {
            const config = this.model.getConfig()
            res.json({ success: true, data: config })
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    }
}
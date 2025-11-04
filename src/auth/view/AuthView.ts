// src/auth/view/AuthView.ts

import { Request, Response } from 'express'
import AuthModel from '../model/AuthModel'

export default class AuthView {
    constructor(private model: AuthModel) { }

    render(_req: Request, res: Response): void  {  
        try {
            const config = this.model.getConfig()
            res.render('auth/auth', { config })
        } catch (error) {
            console.error('Error en AuthView:', error)
            res.status(500).send('Error')
        }
    }

    register(req: Request, res: Response): void  {  // ✅ Sin return
        try {
            const { email, name, password, confirmPassword } = req.body

            if (password !== confirmPassword) {
                res.json({ success: false, message: 'Las contraseñas no coinciden' })  // ✅ Sin return
                return
            }

            const result = this.model.register(email, name, password)
            res.json(result)
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    login  (req: Request, res: Response): void  {
        try {
            const { email, password } = req.body
            const result = this.model.login(email, password)

            if (result.success) {
                ((req as any).session as any).userId = result.user?.id  // ✅ Cast as any
            }

            res.json(result)
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    logout (_req: Request, res: Response): void {
        try {
            this.model.logout()
            res.json({ success: true, message: 'Sesión cerrada' })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

}

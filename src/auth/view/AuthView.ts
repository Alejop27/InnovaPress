
import { Request, Response } from 'express'
import AuthModel from '../model/AuthModel'

export default class AuthView {
    constructor(private model: AuthModel) { }

    render = (_req: Request, res: Response): void => {
        try {
            const config = this.model.getConfig()
            res.render('auth/auth', { config })
        } catch (error) {
            console.error('Error en AuthView:', error)
            res.status(500).send('Error')
        }
    }

    register = (req: Request, res: Response): void => {
        try {
            const { email, name, password, confirmPassword } = req.body

            if (password !== confirmPassword) {
                return res.json({ success: false, message: 'Las contraseñas no coinciden' })
            }

            const result = this.model.register(email, name, password)
            res.json(result)
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    login = (req: Request, res: Response): void => {
        try {
            const { email, password } = req.body
            const result = this.model.login(email, password)

            if (result.success) {
                (req.session as any).userId = result.user?.id
            }

            res.json(result)
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }

    logout = (req: Request, res: Response): void => {
        try {
            this.model.logout()
            req.session.destroy((err) => {
                if (err) {
                    return res.json({ success: false, message: 'Error al cerrar sesión' })
                }
                res.json({ success: true, message: 'Sesión cerrada' })
            })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    }
}
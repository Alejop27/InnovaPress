import { Router } from 'express'
import BodyView from '../view/BodyView'

export default class BodyRouter {
    public readonly router: Router

    constructor(private readonly bodyView: BodyView) {
        this.router = Router()
        this.routes()
    }

    private readonly routes = (): void => {
        // Ruta para obtener solo el HTML del body (para AJAX o inyección)
        this.router.get('/body/partial', (_req, res) => {
            res.send(this.bodyView.renderPartial())
        })

        // Ruta para datos del body (API)
        this.router.get('/body/data', (_req, res) => {
            res.json({
                message: 'Datos del body',
                component: 'body',
                version: '1.0.0'
            })
        })
    }
}

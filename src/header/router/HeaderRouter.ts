import { Router } from 'express'
import HeaderView from '../view/HeaderView'

export default class HeaderRouter {
    public readonly router: Router

    constructor(private readonly headerView: HeaderView) {
        this.router = Router()
        this.routes()
    }

    private readonly routes = (): void => {
        // Ruta principal que renderiza la página completa con header
        this.router.get('/', this.headerView.render)

        // Ruta para obtener solo el HTML del header (para AJAX o inyección)
        this.router.get('/header/partial', (_req, res) => {
            // Esta ruta podría servir el header como componente standalone
            res.send(this.headerView.renderPartial())
        })

        // Ruta para datos del header (API)
        this.router.get('/header/data', (_req, res) => {
            res.json({
                message: 'Datos del header',
                siteName: 'INNOVAPRESS',
                version: '1.0.0'
            })
        })
    }
}
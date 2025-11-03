import { Router } from 'express'
import GrydView from '../view/GrydView'

export default class GrydRouter {
    public readonly router: Router

    constructor(private readonly grydView: GrydView) {
        this.router = Router()
        this.routes()
    }

    private readonly routes = (): void => {
        // Ruta principal del grid
        this.router.get('/noticias', this.grydView.render)

        // Ruta alternativa
        this.router.get('/gryd', this.grydView.render)

        // Ruta para obtener solo el HTML del grid (para AJAX o inyección)
        this.router.get('/gryd/partial', (_req, res) => {
            res.send(this.grydView.renderPartial())
        })

        // Ruta para datos del grid (API)
        this.router.get('/gryd/data', (_req, res) => {
            res.json({
                message: 'Datos del grid',
                component: 'gryd',
                itemsCount: 0,
                version: '1.0.0'
            })
        })

        // Ruta para filtrar grid
        this.router.get('/gryd/filter', (req, res) => {
            const { category, author } = req.query
            res.json({
                message: 'Grid filtrado',
                filters: { category, author },
                results: []
            })
        })
    }
}

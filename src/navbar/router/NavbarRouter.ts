import { Router } from 'express'
import NavbarView from '../view/NavBarView'

export default class NavbarRouter {
    public readonly router: Router

    constructor(private readonly navbarView: NavbarView) {
        this.router = Router()
        this.routes()
    }

    private readonly routes = (): void => {
        // Ruta para obtener solo el HTML de la navbar (para AJAX o inyección)
        this.router.get('/navbar/partial', (_req, res) => {
            res.send(this.navbarView.renderPartial())
        })

        // Ruta para datos de la navbar (API)
        this.router.get('/navbar/data', (_req, res) => {
            res.json({
                message: 'Datos de la navbar',
                component: 'navbar',
                version: '1.0.0'
            })
        })

        // Ruta de búsqueda
        this.router.get('/navbar/search', (req, res) => {
            const query = req.query.q
            res.json({
                query,
                results: [],
                message: 'Búsqueda implementada'
            })
        })
    }
}

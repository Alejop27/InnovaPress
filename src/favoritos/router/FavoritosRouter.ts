import { Router } from 'express'
import FavoritosView from '../view/FavoritosView'

export default class FavoritosRouter {
    public readonly router: Router

    constructor(private readonly favoritosView: FavoritosView) {
        this.router = Router()
        this.routes()
    }

    private readonly routes = (): void => {
        // Ruta principal de favoritos
        this.router.get('/favoritos', this.favoritosView.render)

        // Ruta para obtener solo el HTML de favoritos (para AJAX o inyección)
        this.router.get('/favoritos/partial', (_req, res) => {
            res.send(this.favoritosView.renderPartial())
        })

        // Ruta para datos de favoritos (API)
        this.router.get('/favoritos/data', (_req, res) => {
            res.json({
                message: 'Datos de favoritos',
                component: 'favoritos',
                count: 0,
                version: '1.0.0'
            })
        })

        // Ruta para agregar a favoritos
        this.router.post('/favoritos/add/:id', (req, res) => {
            const { id } = req.params
            res.json({
                success: true,
                message: `Artículo ${id} agregado a favoritos`,
                id
            })
        })

        // Ruta para eliminar de favoritos
        this.router.delete('/favoritos/remove/:id', (req, res) => {
            const { id } = req.params
            res.json({
                success: true,
                message: `Artículo ${id} eliminado de favoritos`,
                id
            })
        })
    }
}

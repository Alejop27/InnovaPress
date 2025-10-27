import { Router } from 'express'
import InicioView from '../view/InicioView'

export default class InicioRouter {
public readonly router: Router

constructor(private readonly inicioView: InicioView) {
    this.router = Router()
    this.routes()
}

private readonly routes = (): void => {
    // Ruta principal de inicio
    this.router.get('/', this.inicioView.render)
    
    // Ruta alternativa para /inicio
    this.router.get('/inicio', this.inicioView.render)

    // Ruta para obtener solo el HTML del inicio (para AJAX o inyección)
    this.router.get('/inicio/partial', (_req, res) => {
    res.send(this.inicioView.renderPartial())
    })

    // Ruta para datos del inicio (API)
    this.router.get('/inicio/data', (_req, res) => {
    res.json({
        message: 'Datos de inicio',
        component: 'inicio',
        version: '1.0.0'
    })
    })
}
}

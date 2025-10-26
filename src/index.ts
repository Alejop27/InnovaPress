import express, { Application } from 'express'
import path from 'path'
import HeaderFactory from './header/factory/HeaderFactory'

export default class Server {
    private readonly app: Application

    constructor(
        private readonly headerFactory: HeaderFactory
    ) {
        this.app = express()
        this.configure()
        this.static()
        this.routes()
    }

    private readonly configure = (): void => {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.set('view engine', 'ejs')
        this.app.set('views', path.join(__dirname, './template'))
    }

    private readonly routes = (): void => {
        // Usar el router desde la factory
        this.app.use('/', this.headerFactory.router)

        // Ruta de salud
        this.app.get('/health', (_req, res) => {
            res.json({
                status: 'OK',
                message: 'INNOVAPRESS Server is running',
                timestamp: new Date().toISOString()
            })
        })
    }

    private readonly static = (): void => {
        this.app.use(express.static(path.join(__dirname, './public')))
    }

    readonly start = (): void => {
        const port = 3000
        const host = 'localhost'
        this.app.listen(port, () => {
            console.log(`🚀 INNOVAPRESS está corriendo en http://${host}:${port}`)
            console.log('📰 Noticias de Proyectos Integradores')
        })
    }
}

// Crear el componente Header usando la Factory
const headerComponent = HeaderFactory.createComponentWithConfig(
    'INNOVAPRESS',
    '/images/logo.png',
    true
)

// Instanciar y iniciar el servidor con la Factory
const server = new Server(headerComponent)
server.start()
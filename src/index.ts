import express, { Application } from 'express'
import path from 'path'

// Importar todas las factories
import HeaderFactory from './header/factory/HeaderFactory'
import BodyFactory from './body/factory/BodyFactory'
import InicioFactory from './inicio/factory/InicioFactory'
import NavbarFactory from './navbar/factory/NavbarFactory'
import FavoritosFactory from './favoritos/factory/FavoritosFactory'
import GrydFactory from './gryd/factory/GrydFactory'
// import NoticiaFactory from './noticia/factory/NoticiaFactory'

export default class Server {
    private readonly app: Application

    constructor(
        private readonly headerFactory: HeaderFactory,
        private readonly bodyFactory: BodyFactory,
        private readonly inicioFactory: InicioFactory,
        private readonly navbarFactory: NavbarFactory,
        private readonly favoritosFactory: FavoritosFactory,
        private readonly grydFactory: GrydFactory,
        // private readonly noticiaFactory: NoticiaFactory,
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
        // Rutas de cada componente
        this.app.use('/', this.headerFactory.router)
        this.app.use('/', this.bodyFactory.router)
        this.app.use('/', this.inicioFactory.router)
        this.app.use('/', this.navbarFactory.router)
        this.app.use('/', this.favoritosFactory.router)
        this.app.use('/', this.grydFactory.router)
        // this.app.use('/', this.noticiaFactory.router)

        // Ruta de salud
        this.app.get('/health', (_req, res) => {
            res.json({
                status: 'OK',
                message: 'INNOVAPRESS Server is running',
                timestamp: new Date().toISOString()
            })
        })

        // Ruta 404
        this.app.use((_req, res) => {
            res.status(404).render('error/404', {
                title: 'Página no encontrada',
                message: 'La página que buscas no existe'
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

// Crear las factories de los componentes
const headerComponent = HeaderFactory.createComponentWithConfig(
    'INNOVAPRESS',
    '/images/logo.png',
    true
)
const bodyComponent = BodyFactory.createComponentWithConfig('single-column', '#f5f5f5', '1200px')
const inicioComponent = InicioFactory.createComponentWithConfig(
    'Bienvenido a INNOVAPRESS',
    'Las noticias más relevantes al instante',
    '/assets/images/hero-banner.jpg'
)
const navbarComponent = NavbarFactory.createComponentWithConfig(true, true, 'inicio')
const favoritosComponent = FavoritosFactory.createComponentWithConfig('date', 'all', 12)
const grydComponent = GrydFactory.createComponentWithConfig(3, '2rem', 'standard')
// const noticiaComponent = NoticiaFactory.createComponentWithConfig(true, true, true, true)

// Instanciar y iniciar el servidor con todas las factories
const server = new Server(
    headerComponent,
    bodyComponent,
    inicioComponent,
    navbarComponent,
    favoritosComponent,
    grydComponent,
    // noticiaComponent
)
server.start()

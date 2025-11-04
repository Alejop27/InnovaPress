import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import session from 'express-session'

// Importar todas las factories
import HeaderFactory from './header/factory/HeaderFactory'
import HeroFactory from './hero/factory/HeroFactory'
import NewsGridFactory from './newsGrid/factory/NewsGridFactory'
import SearchBarFactory from './searchBar/factory/SearchBarFactory'
import PaginationFactory from './pagination/factory/PaginationFactory'
import NewsDetailFactory from './newsDetail/factory/newsDetailFactory'
import CategoriesFactory from './categories/factory/CategoriesFactory'
import FavoritesFactory from './favorites/factory/FavoritesFactory'
import SubmitNewsFactory from './submitNews/factory/SubmitNewsFactory'
import FooterFactory from './footer/factory/FooterFactory'
import AuthFactory from './auth/factory/AuthFactory'

export default class Server {
    private readonly app: Application
    private readonly port: number

    constructor(port: number = 3000) {
        this.app = express()
        this.port = port
        this.configure()
        this.initializeComponents()
        this.routes()
    }

    private configure(): void {
        // Middlewares de sesión
        this.app.use(session({
            secret: 'innovapress-secret-key',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
        }))

        // Middlewares de parsing
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // View engine
        this.app.set('view engine', 'ejs')
        this.app.set('views', path.join(__dirname, './template'))

        // Static files
        this.app.use(express.static(path.join(__dirname, './public')))
        this.app.use('/assets', express.static(path.join(__dirname, '../assets')))

        // Middleware de logging
        this.app.use((req: Request, _res: Response, next: NextFunction) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
            next()
        })
    }

    private initializeComponents(): void {
        console.log('🔧 Inicializando componentes...')
    }

    private routes(): void {
        // Crear instancias de todas las factories
        const headerFactory = HeaderFactory.create()
        const heroFactory = HeroFactory.create()
        const newsGridFactory = NewsGridFactory.create()
        const searchBarFactory = SearchBarFactory.create()
        const paginationFactory = PaginationFactory.create(30)
        const newsDetailFactory = NewsDetailFactory.create()
        const categoriesFactory = CategoriesFactory.create()
        const favoritesFactory = FavoritesFactory.create()
        const submitNewsFactory = SubmitNewsFactory.create()
        const footerFactory = FooterFactory.create()
        const authFactory = AuthFactory.create()

        // Registrar routers
        this.app.use('/', newsGridFactory.getRouter())
        this.app.use('/', headerFactory.getRouter())
        this.app.use('/', heroFactory.getRouter())
        this.app.use('/', searchBarFactory.getRouter())
        this.app.use('/', paginationFactory.getRouter())
        this.app.use('/', newsDetailFactory.getRouter())
        this.app.use('/', categoriesFactory.getRouter())
        this.app.use('/', favoritesFactory.getRouter())
        this.app.use('/', submitNewsFactory.getRouter())
        this.app.use('/', footerFactory.getRouter())
        this.app.use('/', authFactory.getRouter())

        // ✅ RUTA DE SALUD
        this.app.get('/health', (_req: Request, res: Response) => {
            res.json({
                status: 'OK',
                message: 'INNOVAPRESS server is running',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            })
        })

        // ✅ RUTA PRINCIPAL - PÁGINA DE INICIO
        this.app.get('/', (req: Request, res: Response) => {
            res.render('index', {
                title: 'INNOVAPRESS - Noticias de Proyectos Integradores',
                isLoggedIn: ((req as any).session as any)?.userId ? true : false,
                config: {
                    logo: '/assets/logo.png',
                    siteName: 'INNOVAPRESS',
                    navItems: [
                        { label: 'Inicio', url: '/', icon: 'home' },
                        { label: 'Categorías', url: '/categorias', icon: 'grid' },
                        { label: 'Favoritos', url: '/favoritos', icon: 'heart' },
                        { label: 'Pauta', url: '/submit-news', icon: 'send' }
                    ]
                }
            })
        })

        // ✅ RUTA FAVORITOS
        this.app.get('/favoritos', (req: Request, res: Response) => {
            res.render('favorites/favorites', {
                isLoggedIn: ((req as any).session as any)?.userId ? true : false
            })
        })

        // ✅ RUTA SUBMIT NEWS (PAUTA)
        this.app.get('/submit-news', (req: Request, res: Response) => {
            res.render('submitNews/submitNews', {
                isLoggedIn: ((req as any).session as any)?.userId ? true : false
            })
        })

        // ✅ RUTA CATEGORÍAS
        this.app.get('/categorias', (req: Request, res: Response) => {
            res.render('categories/categories', {
                isLoggedIn: ((req as any).session as any)?.userId ? true : false
            })
        })

        // ✅ RUTA AUTH (AUTENTICACIÓN)
        this.app.get('/auth', (req: Request, res: Response) => {
            res.render('auth/auth', {
                isLoggedIn: ((req as any).session as any)?.userId ? true : false
            })
        })

        // ✅ RUTA DETALLE DE NOTICIA
        this.app.get('/noticia/:id', (req: Request, res: Response) => {
            res.render('newsDetail/newsDetail', {
                isLoggedIn: ((req as any).session as any)?.userId ? true : false,
                news: {
                    id: req.params['id'],
                    title: 'Título de la Noticia',
                    content: 'Contenido de la noticia',
                    comments: []
                }
            })
        })

        // ✅ MANEJO DE ERRORES 404
        this.app.use((req: Request, res: Response) => {
            res.status(404).render('error/404', {
                title: 'Página no encontrada',
                url: req.url
            })
        })

        // ✅ MANEJO DE ERRORES GENERAL
        this.app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
            console.error('Error no controlado:', error)
            res.status(500).render('error/500', {
                title: 'Error interno del servidor',
                message: error.message
            })
        })
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log('\n' + '='.repeat(70))
            console.log('INNOVAPRESS INICIADO')
            console.log('='.repeat(70))
            console.log(`Servidor corriendo en: http://localhost:${this.port}`)
            console.log(`Plataforma de Noticias de Proyectos Integradores UPB`)
            console.log('='.repeat(70))
            console.log('\nComponentes disponibles:')
            console.log('   ├─ Header')
            console.log('   ├─ Hero (Banner)')
            console.log('   ├─ NewsGrid (Grilla de noticias)')
            console.log('   ├─ SearchBar (Buscador)')
            console.log('   ├─ Pagination (Paginación)')
            console.log('   ├─ NewsDetail (Detalle de noticia)')
            console.log('   ├─ Categories (Categorías)')
            console.log('   ├─ Favorites (Favoritos)')
            console.log('   ├─ SubmitNews (Pauta con nosotros)')
            console.log('   ├─ Footer')
            console.log('   └─ Auth (Autenticación)')
            console.log('\nRutas principales:')
            console.log('   GET  / - Página de inicio')
            console.log('   GET  /health - Estado del servidor')
            console.log('   GET  /categorias - Categorías')
            console.log('   GET  /favoritos - Mis favoritos')
            console.log('   GET  /noticia/:id - Detalle de noticia')
            console.log('   GET  /submit-news - Pauta con nosotros')
            console.log('   GET  /auth - Autenticación')
            console.log('='.repeat(70) + '\n')
        })
    }
}

// Iniciar servidor
const server = new Server(3000)
server.start()

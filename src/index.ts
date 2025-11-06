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

// Importar repositorio
import NewsRepository from './repository/NewsRepository'

export default class Server {
    private app: Application
    private port: number
    private newsRepository: NewsRepository

    constructor(port: number = 3000) {
        this.app = express()
        this.port = port
        this.newsRepository = new NewsRepository()
        this.configure()
        this.initializeComponents()
        this.routes()
    }

    private configure(): void {
        this.app.use(session({
            secret: 'innovapress-secret-key',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
        }))

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.set('view engine', 'ejs')
        this.app.set('views', path.join(__dirname, './template'))

        this.app.use(express.static(path.join(__dirname, './public')))
        this.app.use('/assets', express.static(path.join(__dirname, '../assets')))

        this.app.use((req: Request, _res: Response, next: NextFunction) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
            next()
        })
    }

    private initializeComponents(): void {
        console.log('🔧 Inicializando componentes...')
    }

    private routes(): void {
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
        this.app.get('/health', (_req: Request, res: Response): void => {
            res.json({
                status: 'OK',
                message: 'INNOVAPRESS server is running',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            })
        })

        // ✅ RUTA PRINCIPAL - PÁGINA DE INICIO CON NOTICIAS
        this.app.get('/', (req: Request, res: Response): void => {
            try {
                const page = req.query['page'] ? parseInt(req.query['page'] as string) : 1
                const category = (req.query['category'] as string) || ''

                let news = this.newsRepository.getAllNews()

                if (category) {
                    news = news.filter(n => n.category.toLowerCase() === category.toLowerCase())
                }

                const pageSize = 6
                const start = (page - 1) * pageSize
                const paginatedNews = news.slice(start, start + pageSize)
                const totalPages = Math.ceil(news.length / pageSize)

                res.render('index', {
                    title: 'INNOVAPRESS - Noticias de Proyectos Integradores',
                    isLoggedIn: ((req as any).session as any)?.userId ? true : false,
                    news: paginatedNews,
                    currentPage: page,
                    totalPages,
                    selectedCategory: category
                })
            } catch (error) {
                console.error('Error en ruta /', error)
                res.status(500).render('error/500', {
                    message: 'Error al cargar las noticias'
                })
            }
        })

        // ✅ RUTA FAVORITOS
        this.app.get('/favoritos', (req: Request, res: Response): void => {
            try {
                res.render('favorites/favorites', {
                    isLoggedIn: ((req as any).session as any)?.userId ? true : false
                })
            } catch (error) {
                console.error('Error en /favoritos:', error)
                res.status(500).render('error/500', { message: 'Error al cargar favoritos' })
            }
        })

        // ✅ RUTA SUBMIT NEWS (PAUTA)
        this.app.get('/submit-news', (req: Request, res: Response): void => {
            try {
                res.render('submitNews/submitNews', {
                    isLoggedIn: ((req as any).session as any)?.userId ? true : false
                })
            } catch (error) {
                console.error('Error en /submit-news:', error)
                res.status(500).render('error/500', { message: 'Error al cargar formulario' })
            }
        })

        // ✅ RUTA CATEGORÍAS
        this.app.get('/categorias', (req: Request, res: Response): void => {
            try {
                const news = this.newsRepository.getAllNews()
                const categories = [...new Set(news.map(n => n.category))]

                res.render('categories/categories', {
                    isLoggedIn: ((req as any).session as any)?.userId ? true : false,
                    categories
                })
            } catch (error) {
                console.error('Error en /categorias:', error)
                res.status(500).render('error/500', { message: 'Error al cargar categorías' })
            }
        })

        // ✅ RUTA AUTH (AUTENTICACIÓN)
        this.app.get('/auth', (req: Request, res: Response): void => {
            try {
                res.render('auth/auth', {
                    isLoggedIn: ((req as any).session as any)?.userId ? true : false
                })
            } catch (error) {
                console.error('Error en /auth:', error)
                res.status(500).render('error/500', { message: 'Error al cargar autenticación' })
            }
        })

        // ✅ RUTA DETALLE DE NOTICIA
        this.app.get('/noticia/:id', (req: Request, res: Response): void => {
            try {
                const newsId = req.params['id']!
                const news = this.newsRepository.getNewsById(newsId)

                if (!news) {
                    res.status(404).render('error/404', { url: req.url })
                    return
                }

                res.render('newsDetail/newsDetail', {
                    isLoggedIn: ((req as any).session as any)?.userId ? true : false,
                    news
                })
            } catch (error) {
                console.error('Error en /noticia/:id:', error)
                res.status(500).render('error/500', { message: 'Error al cargar noticia' })
            }
        })

        // ✅ API - BUSCAR NOTICIAS
        this.app.get('/api/search', (req: Request, res: Response): void => {
            try {
                const query = (req.query['q'] as string) || ''
                const results = this.newsRepository.searchNews(query)

                res.json({
                    success: true,
                    results,
                    count: results.length
                })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error en búsqueda' })
            }
        })

        // ✅ API - OBTENER NOTICIAS POR CATEGORÍA
        this.app.get('/api/news/category/:category', (req: Request, res: Response): void => {
            try {
                const category = req.params['category']!
                const news = this.newsRepository.getNewsByCategory(category)

                res.json({
                    success: true,
                    news,
                    count: news.length
                })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error al obtener noticias' })
            }
        })

        // ✅ API - AGREGAR LIKE
        this.app.post('/api/news/:id/like', (req: Request, res: Response): void => {
            try {
                const newsId = req.params['id']!
                const success = this.newsRepository.addLike(newsId)

                if (!success) {
                    res.status(404).json({ success: false, message: 'Noticia no encontrada' })
                    return
                }

                res.json({ success: true, message: 'Like agregado' })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error al agregar like' })
            }
        })

        // ✅ API - AGREGAR COMENTARIO
        this.app.post('/api/news/:id/comment', (req: Request, res: Response): void => {
            try {
                const newsId = req.params['id']!
                const { author, text } = req.body

                if (!author || !text) {
                    res.status(400).json({ success: false, message: 'Faltan campos' })
                    return
                }

                const comment: any = {
                    id: Date.now().toString(),
                    author,
                    text,
                    date: new Date().toISOString().split('T')[0]
                }

                const success = this.newsRepository.addComment(newsId, comment as any)

                if (!success) {
                    res.status(404).json({ success: false, message: 'Noticia no encontrada' })
                    return
                }

                res.json({ success: true, message: 'Comentario agregado', comment })
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error al agregar comentario' })
            }
        })

        // ✅ MANEJO DE ERRORES 404
        this.app.use((req: Request, res: Response): void => {
            res.status(404).render('error/404', {
                title: 'Página no encontrada',
                url: req.url
            })
        })

        // ✅ MANEJO DE ERRORES GENERAL
        this.app.use((error: Error, _req: Request, res: Response, _next: NextFunction): void => {
            console.error('Error no controlado:', error)
            res.status(500).render('error/500', {
                title: 'Error interno del servidor',
                message: error.message
            })
        })
    }

    public start(): void {
        const PORT = process.env['PORT'] || this.port

        this.app.listen(PORT, () => {
            console.log('\n' + '='.repeat(70))
            console.log('INNOVAPRESS INICIADO')
            console.log('='.repeat(70))
            console.log(`Servidor corriendo en: http://localhost:${PORT}`)
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
            console.log('   GET  /api/search?q=query - Buscar noticias')
            console.log('   GET  /api/news/category/:category - Noticias por categoría')
            console.log('   POST /api/news/:id/like - Agregar like')
            console.log('   POST /api/news/:id/comment - Agregar comentario')
            console.log('='.repeat(70) + '\n')
        })
    }
}

// Iniciar servidor
const server = new Server(3000)
server.start()

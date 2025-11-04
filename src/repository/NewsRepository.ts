import * as fs from 'fs'
import * as path from 'path'

export interface News {
    id: string
    title: string
    summary: string
    fullContent: string
    image: string
    category: string
    subject: 'Integrador I' | 'Integrador II' | 'Integrador III' | 'Ing Software' | 'Estructura Datos' | 'Sistemas Distribuidos'
    date: string
    author: string
    likes: number
    comments: Comment[]
    favorites: number
}

export interface Comment {
    id: string
    author: string
    text: string
    date: string
}

export interface User {
    id: string
    email: string
    name: string
    password: string
    favorites: string[]
}

export class NewsRepository {
    private dataPath = path.join(process.cwd(), 'data')
    private newsFile = path.join(this.dataPath, 'noticias.json')
    private usersFile = path.join(this.dataPath, 'usuarios.json')

    constructor() {
        this.initializeFiles()
    }

    private initializeFiles(): void {
        if (!fs.existsSync(this.dataPath)) {
            fs.mkdirSync(this.dataPath, { recursive: true })
        }

        if (!fs.existsSync(this.newsFile)) {
            fs.writeFileSync(this.newsFile, JSON.stringify(this.getDefaultNews(), null, 2))
        }

        if (!fs.existsSync(this.usersFile)) {
            fs.writeFileSync(this.usersFile, JSON.stringify([], null, 2))
        }
    }

    private getDefaultNews(): News[] {
        return [
            {
                id: '1',
                title: 'Plataforma de Gestión de Proyectos - Integrador I',
                summary: 'Desarrollo de una plataforma web para gestionar proyectos académicos',
                fullContent: 'Contenido completo de la noticia...',
                image: '/assets/images/news-1.jpg',
                category: 'Tecnología',
                subject: 'Integrador I',
                date: '2025-11-04',
                author: 'Equipo Desarrollo',
                likes: 45,
                comments: [],
                favorites: 12
            }
        ]
    }

    getAllNews(): News[] {
        try {
            const data = fs.readFileSync(this.newsFile, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return this.getDefaultNews()
        }
    }

    getNewsBySubject(subject: string): News[] {
        return this.getAllNews().filter(news => news.subject === subject)
    }

    getNewsById(id: string): News | undefined {
        return this.getAllNews().find(news => news.id === id)
    }

    searchNews(query: string): News[] {
        const allNews = this.getAllNews()
        return allNews.filter(news =>
            news.title.toLowerCase().includes(query.toLowerCase()) ||
            news.summary.toLowerCase().includes(query.toLowerCase())
        )
    }

    addNews(news: News): void {
        const allNews = this.getAllNews()
        allNews.push(news)
        fs.writeFileSync(this.newsFile, JSON.stringify(allNews, null, 2))
    }

    updateLikes(id: string): void {
        const allNews = this.getAllNews()
        const news = allNews.find(n => n.id === id)
        if (news) {
            news.likes++
            fs.writeFileSync(this.newsFile, JSON.stringify(allNews, null, 2))
        }
    }

    addComment(newsId: string, comment: Comment): void {
        const allNews = this.getAllNews()
        const news = allNews.find(n => n.id === newsId)
        if (news) {
            news.comments.push(comment)
            fs.writeFileSync(this.newsFile, JSON.stringify(allNews, null, 2))
        }
    }

    getAllUsers(): User[] {
        try {
            const data = fs.readFileSync(this.usersFile, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    getUserByEmail(email: string): User | undefined {
        return this.getAllUsers().find(user => user.email === email)
    }

    createUser(user: User): void {
        const users = this.getAllUsers()
        users.push(user)
        fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2))
    }

    addFavorite(userId: string, newsId: string): void {
        const users = this.getAllUsers()
        const user = users.find(u => u.id === userId)
        if (user && !user.favorites.includes(newsId)) {
            user.favorites.push(newsId)
            fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2))
        }
    }

    removeFavorite(userId: string, newsId: string): void {
        const users = this.getAllUsers()
        const user = users.find(u => u.id === userId)
        if (user) {
            user.favorites = user.favorites.filter(fav => fav !== newsId)
            fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2))
        }
    }

    getUserFavorites(userId: string): News[] {
        const users = this.getAllUsers()
        const user = users.find(u => u.id === userId)
        if (!user) return []

        const allNews = this.getAllNews()
        return allNews.filter(news => user.favorites.includes(news.id))
    }
}

export default new NewsRepository()
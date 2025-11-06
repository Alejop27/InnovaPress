import * as fs from 'fs'
import * as path from 'path'

interface Comment {
    id: string
    author: string
    text: string
    date: string
}

interface News {
    id: string
    title: string
    summary: string
    category: string
    content: string
    image: string
    author: string
    date: string
    likes: number
    comments: Comment[]
}

export default class NewsRepository {
    private news: News[] = []

    constructor() {
        this.loadNews()
    }

    private loadNews(): void {
        try {
            const filePath = path.join(__dirname, '../data/news-database.json')
            const data = fs.readFileSync(filePath, 'utf-8')
            const json = JSON.parse(data)
            this.news = json.news || []
        } catch (error) {
            console.error('Error cargando noticias:', error)
            this.news = []
        }
    }

    getAllNews(): News[] {
        return this.news
    }

    getNewsByCategory(category: string): News[] {
        return this.news.filter(news => news.category.toLowerCase() === category.toLowerCase())
    }

    getNewsById(id: string): News | undefined {
        return this.news.find(news => news.id === id)
    }

    getNewsByPage(page: number, pageSize: number = 6): News[] {
        const start = (page - 1) * pageSize
        return this.news.slice(start, start + pageSize)
    }

    getTotalPages(pageSize: number = 6): number {
        return Math.ceil(this.news.length / pageSize)
    }

    addComment(newsId: string, comment: Comment): boolean {
        const news = this.getNewsById(newsId)
        if (news) {
            news.comments.push(comment)
            return true
        }
        return false
    }

    addLike(newsId: string): boolean {
        const news = this.getNewsById(newsId)
        if (news) {
            news.likes++
            return true
        }
        return false
    }

    searchNews(query: string): News[] {
        const lowerQuery = query.toLowerCase()
        return this.news.filter(news =>
            news.title.toLowerCase().includes(lowerQuery) ||
            news.summary.toLowerCase().includes(lowerQuery) ||
            news.content.toLowerCase().includes(lowerQuery)
        )
    }
}

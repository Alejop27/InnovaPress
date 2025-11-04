
import { DetailNews, DetailComment } from '../types/NewsDetailTypes'
import NewsRepository from '../../repository/NewsRepository'

export default class NewsDetailModel {
    private currentNews: DetailNews | null = null
    private userLiked: boolean = false
    private userFavorited: boolean = false

    constructor(private repository: typeof NewsRepository) { }

    loadNews(newsId: string): DetailNews | null {
        const news = this.repository.getNewsById(newsId)
        if (!news) return null

        this.currentNews = {
            id: news.id,
            title: news.title,
            subtitle: news.summary,
            content: news.fullContent,
            image: news.image,
            category: news.category,
            subject: news.subject,
            date: news.date,
            author: news.author,
            likes: news.likes,
            isFavorite: false,
            comments: news.comments.map(c => ({
                id: c.id,
                author: c.author,
                text: c.text,
                date: c.date,
                docent: true
            }))
        }

        return this.currentNews
    }

    getCurrentNews(): DetailNews | null {
        return this.currentNews
    }

    addLike(newsId: string): void {
        this.repository.updateLikes(newsId)
        if (this.currentNews) {
            this.currentNews.likes++
            this.userLiked = true
        }
    }

    addComment(newsId: string, author: string, text: string): void {
        const dateStr = new Date().toISOString().split('T')[0] as string 
        const comment: DetailComment = {
            id: Date.now().toString(),
            author,
            text,
            date: dateStr,
            docent: false
        }

        this.repository.addComment(newsId, {
            id: comment.id,
            author: comment.author,
            text: comment.text,
            date: comment.date
        })

        if (this.currentNews) {
            this.currentNews.comments.push(comment)
        }
    }

    toggleFavorite(): void {
        this.userFavorited = !this.userFavorited
        if (this.currentNews) {
            this.currentNews.isFavorite = this.userFavorited
        }
    }
}
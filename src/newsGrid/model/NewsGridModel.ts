
import { NewsGridConfig, GridNews } from '../types/NewsGridTypes'
import NewsRepository, { News } from '../../repository/NewsRepository'

export default class NewsGridModel {
    private itemsPerPage: number = 12
    private layout: 'grid' | 'masonry' = 'grid'
    private columns: number = 3
    private enableModal: boolean = true
    private currentPage: number = 1
    private selectedCategory: string = 'all'

    constructor(private repository: typeof NewsRepository) { }

    getConfig(): NewsGridConfig {
        return {
            itemsPerPage: this.itemsPerPage,
            layout: this.layout,
            columns: this.columns,
            enableModal: this.enableModal
        }
    }

    getGridNews(page: number = 1): GridNews[] {
        let news = this.repository.getAllNews()

        if (this.selectedCategory !== 'all') {
            news = news.filter(n => n.subject === this.selectedCategory)
        }

        const start = (page - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage

        return news.slice(start, end).map(n => ({
            id: n.id,
            title: n.title,
            image: n.image,
            category: n.subject,
            date: n.date,
            likes: n.likes
        }))
    }

    getTotalPages(): number {
        const total = this.repository.getAllNews().length
        return Math.ceil(total / this.itemsPerPage)
    }

    setCategory(category: string): void {
        this.selectedCategory = category
        this.currentPage = 1
    }

    getCurrentPage(): number {
        return this.currentPage
    }

    setCurrentPage(page: number): void {
        this.currentPage = page
    }

    getNewsByType(): News[] {
        return this.repository.getAllNews()
    }
}
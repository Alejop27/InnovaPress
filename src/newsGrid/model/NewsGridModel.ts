import NewsRepository from '../../repository/NewsRepository'

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
    comments: any[]
}

export default class NewsGridModel {
    private repository: NewsRepository
    private currentPage: number = 1
    private selectedCategory: string = ''
    private pageSize: number = 6

    constructor() {
        this.repository = new NewsRepository()
    }

    getGridNews(page: number = 1): News[] {
        const news = this.repository.getAllNews()
        const filtered = this.selectedCategory 
            ? news.filter((n: any) => n.category === this.selectedCategory)
            : news

        const start = (page - 1) * this.pageSize
        return filtered.slice(start, start + this.pageSize)
    }

    setCurrentPage(page: number): void {
        this.currentPage = page
    }

    getCurrentPage(): number {
        return this.currentPage
    }

    setCategory(category: string): void {
        this.selectedCategory = category
    }

    getCategory(): string {
        return this.selectedCategory
    }

    getTotalPages(): number {
        const news = this.repository.getAllNews()
        const filtered = this.selectedCategory 
            ? news.filter((n: any) => n.category === this.selectedCategory)
            : news
        return Math.ceil(filtered.length / this.pageSize)
    }

    getConfig(): any {
        return {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            selectedCategory: this.selectedCategory
        }
    }

    getNews(): News[] {
        return this.repository.getAllNews()
    }

    getNewsByPage(page: number): News[] {
        return this.getGridNews(page)
    }
}

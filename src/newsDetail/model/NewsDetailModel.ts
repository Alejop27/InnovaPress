import NewsRepository from '../../repository/NewsRepository'

export default class NewsDetailModel {
    private repository: NewsRepository
    private newsId: string = ''

    constructor() {
        this.repository = new NewsRepository()
    }

    setNewsId(id: string): void {
        this.newsId = id
    }

    getNews(): any {
        if (!this.newsId) return null
        return this.repository.getNewsById(this.newsId)
    }

    getComments(): any[] {
        const news = this.getNews()
        if (!news) return []
        return news.comments.map((c: any) => ({
            id: c.id,
            author: c.author,
            text: c.text,
            date: c.date
        }))
    }

    addLike(): boolean {
        if (!this.newsId) return false
        return this.repository.addLike(this.newsId)
    }

    addComment(author: string, text: string): boolean {
        if (!this.newsId) return false

        const comment: any = {
            id: Date.now().toString(),
            author,
            text,
            date: new Date().toISOString().split('T')[0]
        }

        return this.repository.addComment(this.newsId, comment)
    }

    getLikes(): number {
        const news = this.getNews()
        return news ? news.likes : 0
    }

    getCommentCount(): number {
        return this.getComments().length
    }

}

import NewsDetailModel from '../model/NewsDetailModel'

export default class NewsDetailView {
    private model: NewsDetailModel

    constructor(model: NewsDetailModel) {
        this.model = model
    }

    loadNews(newsId: string): any {
        this.model.setNewsId(newsId)
        return this.model.getNews()
    }

    renderNews(): any {
        const news = this.model.getNews()
        if (!news) {
            return { error: 'Noticia no encontrada' }
        }

        return {
            id: news.id,
            title: news.title,
            content: news.content,
            image: news.image,
            date: news.date,
            author: news.author,
            category: news.category,
            likes: this.model.getLikes(),
            comments: this.model.getComments()
        }
    }

    addLike(): boolean {
        return this.model.addLike()
    }

    addComment(author: string, text: string): boolean {
        return this.model.addComment(author, text)
    }

    getComments(): any[] {
        return this.model.getComments()
    }

    getCommentCount(): number {
        return this.model.getCommentCount()
    }

    getLikes(): number {
        return this.model.getLikes()
    }
}

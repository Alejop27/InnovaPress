import NewsRepository from '../../repository/NewsRepository'

export default class FavoritesModel {
    private repository: NewsRepository
    private favorites: string[] = []

    constructor() {
        this.repository = new NewsRepository()
        this.loadFavorites()
    }

    private loadFavorites(): void {
        // Cargar favoritos desde localStorage o sesión
        this.favorites = []
    }

    getFavorites(): any[] {
        const allNews = this.repository.getAllNews()
        return allNews.filter((n: any) => this.favorites.includes(n.id))
    }

    addFavorite(newsId: string): boolean {
        if (!this.favorites.includes(newsId)) {
            this.favorites.push(newsId)
            this.saveFavorites()
            return true
        }
        return false
    }

    removeFavorite(newsId: string): boolean {
        const index = this.favorites.indexOf(newsId)
        if (index > -1) {
            this.favorites.splice(index, 1)
            this.saveFavorites()
            return true
        }
        return false
    }

    isFavorite(newsId: string): boolean {
        return this.favorites.includes(newsId)
    }

    getFavoritesCount(): number {
        return this.favorites.length
    }

    private saveFavorites(): void {
        // Guardar favoritos en localStorage o sesión
    }

    clearFavorites(): void {
        this.favorites = []
        this.saveFavorites()
    }
}

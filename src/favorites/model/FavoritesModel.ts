
import { FavoriteNews, FavoritesConfig } from '../types/FavoritesTypes'
import NewsRepository from '../../repository/NewsRepository'

export default class FavoritesModel {
    private currentUserId: string = 'user-1'
    private userFavorites: FavoriteNews[] = []

    constructor(private repository: typeof NewsRepository) { }

    loadUserFavorites(userId: string = 'user-1'): FavoriteNews[] {
        this.currentUserId = userId
        const favoriteNews = this.repository.getUserFavorites(userId)

        this.userFavorites = favoriteNews.map(n => ({
            id: n.id,
            title: n.title,
            image: n.image,
            category: n.subject,
            date: n.date
        }))

        return this.userFavorites
    }

    getConfig(): FavoritesConfig {
        return {
            userFavorites: this.userFavorites,
            totalFavorites: this.userFavorites.length
        }
    }

    addToFavorites(newsId: string): void {
        this.repository.addFavorite(this.currentUserId, newsId)
        this.loadUserFavorites(this.currentUserId)
    }

    removeFromFavorites(newsId: string): void {
        this.repository.removeFavorite(this.currentUserId, newsId)
        this.loadUserFavorites(this.currentUserId)
    }

    getFavoriteCount(): number {
        return this.userFavorites.length
    }
}

export interface FavoriteNews {
    id: string
    title: string
    image: string
    category: string
    date: string
}

export interface FavoritesConfig {
    userFavorites: FavoriteNews[]
    totalFavorites: number
}
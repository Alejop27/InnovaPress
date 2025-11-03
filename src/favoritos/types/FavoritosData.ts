export interface FavoritosData {
    favorites: FavoriteItem[];
    totalCount: number;
    sortBy: 'date' | 'title' | 'category';
    filterBy: string;
}

export interface FavoriteItem {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    addedDate: Date;
    url: string;
}

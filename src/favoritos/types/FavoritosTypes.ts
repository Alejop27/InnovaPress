export type SortOption = 'date' | 'title' | 'category'

export type FilterCategory = 'all' | 'Integrador I' | 'Integrador II' | 'Integrador III' | 'Proyectos de Aula'

export interface FavoritosConfig {
    itemsPerPage: number;
    enableSort: boolean;
    enableFilter: boolean;
    showThumbnails: boolean;
}

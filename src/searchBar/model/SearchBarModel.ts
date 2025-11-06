import NewsRepository from '../../repository/NewsRepository'

export default class SearchBarModel {
    private repository: NewsRepository

    constructor() {
        this.repository = new NewsRepository()
    }

    search(query: string): any[] {
        if (!query || query.trim() === '') {
            return []
        }
        return this.repository.searchNews(query)
    }

    getRecentSearches(): string[] {
        return []
    }

    clearSearch(): void {
        // limpiar búsqueda
    }

    getConfig(): any {
        return {
            placeholder: 'Buscar noticias, proyectos...',
            minChars: 2
        }
    }

    filterResults(results: any[], category?: string): any[] {
        if (!category) {
            return results
        }
        return results.filter((n: any) => n.category === category)
    }
}


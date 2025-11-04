
import { SearchConfig, SearchResult } from '../types/SearchBarTypes'
import NewsRepository from '../../repository/NewsRepository'

export default class SearchBarModel {
    private placeholder: string = 'Buscar noticias, proyectos...'
    private enableFilters: boolean = true
    private filterOptions: string[] = [
        'Integrador I',
        'Integrador II',
        'Integrador III',
        'Ing Software',
        'Estructura Datos',
        'Sistemas Distribuidos'
    ]

    constructor(private repository: typeof NewsRepository) { }

    getConfig(): SearchConfig {
        return {
            placeholder: this.placeholder,
            enableFilters: this.enableFilters,
            filterOptions: this.filterOptions
        }
    }

    search(query: string): SearchResult[] {
        if (!query || query.length < 2) return []

        const results = this.repository.searchNews(query)
        return results.map(n => ({
            id: n.id,
            title: n.title,
            category: n.subject,
            date: n.date
        }))
    }

    getFilters(): string[] {
        return this.filterOptions
    }
}
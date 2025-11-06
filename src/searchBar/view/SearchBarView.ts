import SearchBarModel from '../model/SearchBarModel'

export default class SearchBarView {
    private model: SearchBarModel

    constructor(model: SearchBarModel) {
        this.model = model
    }

    render(): any {
        const config = this.model.getConfig()
        const filters = this.getFilters()

        return {
            config,
            filters,
            placeholder: config.placeholder
        }
    }

    search(query: string): any[] {
        return this.model.search(query)
    }

    getConfig(): any {
        return this.model.getConfig()
    }

    getFilters(): string[] {
        return ['Todas', 'Integrador I', 'Integrador II', 'Proyecto Integrador']
    }

    displayResults(results: any[]): void {
        console.log('Resultados:', results)
    }
}

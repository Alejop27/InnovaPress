import { Request, Response } from 'express'

export default class GrydView {
    private columns: number = 3
    private gap: string = '2rem'
    private layout: 'masonry' | 'standard' | 'featured' = 'standard'

    render = (req: Request, res: Response): void => {
        try {
            const data = {
                items: this.getGridItems(),
                columns: this.columns,
                gap: this.gap,
                layout: this.layout,
                currentPath: req.path
            }

            res.render('gryd/gryd', data)
        } catch (error) {
            console.error('Error en GrydView:', error)
            res.status(500).send('Error interno del servidor')
        }
    }

    // Métodos privados para obtener datos
    private getGridItems() {
        // Aquí normalmente se consultaría una base de datos
        return [
            {
                id: '1',
                title: 'Avances en Inteligencia Artificial',
                excerpt: 'Los últimos desarrollos en IA están transformando la industria...',
                image: '/assets/images/grid-1.jpg',
                category: 'Tecnología',
                author: 'Juan Pérez',
                publishDate: new Date(),
                readTime: 5,
                url: '/noticia/1'
            },
            {
                id: '2',
                title: 'Economía Global en 2025',
                excerpt: 'Análisis de las tendencias económicas actuales...',
                image: '/assets/images/grid-2.jpg',
                category: 'Economía',
                author: 'María García',
                publishDate: new Date(),
                readTime: 8,
                url: '/noticia/2'
            },
            {
                id: '3',
                title: 'Deportes: Finales del Campeonato',
                excerpt: 'Cobertura completa de los eventos deportivos...',
                image: '/assets/images/grid-3.jpg',
                category: 'Deportes',
                author: 'Carlos López',
                publishDate: new Date(),
                readTime: 3,
                url: '/noticia/3'
            }
        ]
    }

    // Métodos de configuración
    updateColumns(columns: number): void {
        this.columns = columns
    }

    updateGap(gap: string): void {
        this.gap = gap
    }

    updateLayout(layout: 'masonry' | 'standard' | 'featured'): void {
        this.layout = layout
    }

    // Método para renderizar solo el grid (para inyección en otros componentes)
    renderPartial(): string {
        return `<div class="gryd gryd--${this.layout}" style="grid-template-columns: repeat(${this.columns}, 1fr); gap: ${this.gap}"></div>`
    }
}

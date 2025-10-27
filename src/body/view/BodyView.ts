import { Request, Response } from 'express'

export default class BodyView {
    private contentType: string = 'main'
    private layout: 'single-column' | 'two-column' | 'three-column' = 'single-column'
    private backgroundColor: string = '#ffffff'
    private maxWidth: string = '1200px'

    render = (req: Request, res: Response): void => {
        try {
            const data = {
                contentType: this.contentType,
                layout: this.layout,
                backgroundColor: this.backgroundColor,
                maxWidth: this.maxWidth,
                currentPath: req.path
            }

            res.render('body/body', data)
        } catch (error) {
            console.error('Error en BodyView:', error)
            res.status(500).send('Error interno del servidor')
        }
    }

    // Métodos de configuración
    updateLayout(layout: 'single-column' | 'two-column' | 'three-column'): void {
        this.layout = layout
    }

    updateBackgroundColor(color: string): void {
        this.backgroundColor = color
    }

    updateMaxWidth(width: string): void {
        this.maxWidth = width
    }

    updateContentType(type: string): void {
        this.contentType = type
    }

    // Método para renderizar solo el body (para inyección en otros componentes)
    renderPartial(): string {
        return `<main class="body body--${this.layout}" style="background: ${this.backgroundColor}; max-width: ${this.maxWidth}"></main>`
    }
}

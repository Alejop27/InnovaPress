import { Request, Response } from 'express'

export default class HeaderView {
    private siteName: string = 'INNOVAPRESS'
    private logo: string = '/assets/logo/logo.png'
    private isSticky: boolean = true

    render = (req: Request, res: Response): void => {
        try {
            const data = {
                siteName: this.siteName,
                logo: this.logo,
                isSticky: this.isSticky,
                navigation: [
                    { label: 'Inicio', url: '/', isActive: req.path === '/' },
                    { label: 'Categorías', url: '/categorias', isActive: req.path === '/categorias' },
                    { label: 'Quiénes Somos', url: '/quienes-somos', isActive: req.path === '/quienes-somos' },
                    { label: 'Contacto', url: '/contacto', isActive: req.path === '/contacto' },
                    { label: 'PQRS', url: '/pqrs', isActive: req.path === '/pqrs' }
                ],
                currentPath: req.path
            }

            res.render('header/header', data)
        } catch (error) {
            console.error('Error en HeaderView:', error)
            res.status(500).send('Error interno del servidor')
        }
    }

    // Métodos de configuración
    updateSiteName(name: string): void {
        this.siteName = name
    }

    updateLogo(logoPath: string): void {
        this.logo = logoPath
    }

    setSticky(sticky: boolean): void {
        this.isSticky = sticky
    }

    // Método para renderizar solo el header (para inyección en otros componentes)
    renderPartial(): string {
        // Esta implementación sería para cuando se use el header como componente inyectado
        return ''
    }
}
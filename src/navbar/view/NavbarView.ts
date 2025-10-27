import { Request, Response } from 'express'

export default class NavbarView {
    private showSearch: boolean = true
    private showUserMenu: boolean = true
    private currentSection: string = 'inicio'

    render = (req: Request, res: Response): void => {
        try {
            const data = {
                breadcrumbs: this.generateBreadcrumbs(req.path),
                showSearch: this.showSearch,
                showUserMenu: this.showUserMenu,
                currentSection: this.currentSection,
                currentPath: req.path
            }

            res.render('navbar/navbar', data)
        } catch (error) {
            console.error('Error en NavbarView:', error)
            res.status(500).send('Error interno del servidor')
        }
    }

    // Método privado para generar breadcrumbs basado en la ruta
    private generateBreadcrumbs(path: string) {
        const segments = path.split('/').filter(segment => segment !== '')
        const breadcrumbs = [
            { label: 'Inicio', url: '/', isActive: segments.length === 0 }
        ]

        let currentPath = ''
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`
            breadcrumbs.push({
                label: this.capitalizeFirst(segment),
                url: currentPath,
                isActive: index === segments.length - 1
            })
        })

        return breadcrumbs
    }

    private capitalizeFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // Métodos de configuración
    toggleSearch(show: boolean): void {
        this.showSearch = show
    }

    toggleUserMenu(show: boolean): void {
        this.showUserMenu = show
    }

    updateCurrentSection(section: string): void {
        this.currentSection = section
    }

    // Método para renderizar solo la navbar (para inyección en otros componentes)
    renderPartial(): string {
        return `<nav class="navbar"><div class="navbar__container"></div></nav>`
    }
}

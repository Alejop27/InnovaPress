import { Request, Response } from 'express'

export default class InicioView {
    private heroTitle: string = 'Bienvenido a INNOVAPRESS'
    private heroSubtitle: string = 'Las noticias más relevantes al instante'
    private heroImage: string = '/assets/images/hero-banner.jpg'

    render = (req: Request, res: Response): void => {
        try {
            const data = {
                heroTitle: this.heroTitle,
                heroSubtitle: this.heroSubtitle,
                heroImage: this.heroImage,
                featuredNews: this.getFeaturedNews(),
                quickLinks: this.getQuickLinks(),
                currentPath: req.path
            }

            res.render('inicio/inicio', data)
        } catch (error) {
            console.error('Error en InicioView:', error)
            res.status(500).send('Error interno del servidor')
        }
    }

    // Métodos privados para obtener datos
    private getFeaturedNews() {
        // Aquí normalmente se consultaría una base de datos
        return [
            {
                id: '1',
                title: 'Noticia Destacada 1',
                excerpt: 'Resumen de la noticia destacada...',
                image: '/assets/images/news-1.jpg',
                category: 'Tecnología',
                publishDate: new Date(),
                author: 'Redacción INNOVAPRESS'
            },
            {
                id: '2',
                title: 'Noticia Destacada 2',
                excerpt: 'Resumen de la segunda noticia...',
                image: '/assets/images/news-2.jpg',
                category: 'Deportes',
                publishDate: new Date(),
                author: 'Redacción INNOVAPRESS'
            }
        ]
    }

    private getQuickLinks() {
        return [
            { label: 'Últimas Noticias', url: '/noticias', icon: 'newspaper' },
            { label: 'Categorías', url: '/categorias', icon: 'grid' },
            { label: 'Favoritos', url: '/favoritos', icon: 'heart' },
            { label: 'Contacto', url: '/contacto', icon: 'mail' }
        ]
    }

    // Métodos de configuración
    updateHeroTitle(title: string): void {
        this.heroTitle = title
    }

    updateHeroSubtitle(subtitle: string): void {
        this.heroSubtitle = subtitle
    }

    updateHeroImage(image: string): void {
        this.heroImage = image
    }

    // Método para renderizar solo el inicio (para inyección en otros componentes)
    renderPartial(): string {
        return `<section class="inicio"><h1>${this.heroTitle}</h1><p>${this.heroSubtitle}</p></section>`
    }
}


import { FooterConfig } from '../types/FooterTypes'

export default class FooterModel {
    private copyrightText: string = '© 2025 INNOVAPRESS - UPB Bucaramanga'
    private socialLinks = {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
    }
    private quickLinks = [
        { label: 'Inicio', url: '/' },
        { label: 'Categorías', url: '/categorias' },
        { label: 'Favoritos', url: '/favoritos' },
        { label: 'Pauta con Nosotros', url: '/submit-news' }
    ]
    private contactEmail: string = 'contacto@innovapress.upb.edu.co'

    getConfig(): FooterConfig {
        return {
            copyrightText: this.copyrightText,
            socialLinks: this.socialLinks,
            quickLinks: this.quickLinks,
            contactEmail: this.contactEmail
        }
    }
}
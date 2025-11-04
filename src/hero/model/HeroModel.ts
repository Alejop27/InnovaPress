import { HeroConfig, HeroImage } from '../types/HeroTypes'

export default class HeroModel {
    private title: string = 'Jornada de Proyectos Integradores'
    private subtitle: string = 'Segundo Semestre 2025'
    private images: HeroImage[] = [
        { id: '1', url: '/assets/images/collage-1.jpg', alt: 'Proyecto 1' },
        { id: '2', url: '/assets/images/collage-2.jpg', alt: 'Proyecto 2' },
        { id: '3', url: '/assets/images/collage-3.jpg', alt: 'Proyecto 3' },
        { id: '4', url: '/assets/images/collage-4.jpg', alt: 'Proyecto 4' }
    ]
    private enableCollage: boolean = true

    getConfig(): HeroConfig {
        return {
            title: this.title,
            subtitle: this.subtitle,
            images: this.images,
            enableCollage: this.enableCollage
        }
    }

    setTitle(title: string): void {
        this.title = title
    }

    setSubtitle(subtitle: string): void {
        this.subtitle = subtitle
    }

    addImage(image: HeroImage): void {
        this.images.push(image)
    }

    getImages(): HeroImage[] {
        return this.images
    }
}
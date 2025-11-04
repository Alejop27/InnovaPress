export interface HeroImage {
    id: string
    url: string
    alt: string
}

export interface HeroConfig {
    title: string
    subtitle: string
    images: HeroImage[]
    enableCollage: boolean
}
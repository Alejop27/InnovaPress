
export interface FooterLink {
    label: string
    url: string
}

export interface FooterConfig {
    copyrightText: string
    socialLinks: { [key: string]: string }
    quickLinks: FooterLink[]
    contactEmail: string
}
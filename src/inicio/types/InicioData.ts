export interface InicioData {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    featuredNews: FeaturedNewsItem[];
    quickLinks: QuickLink[];
}

export interface FeaturedNewsItem {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    publishDate: Date;
    author: string;
}

export interface QuickLink {
    label: string;
    url: string;
    icon: string;
}

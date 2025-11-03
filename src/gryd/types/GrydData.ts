export interface GrydData {
    items: GrydItem[];
    columns: number;
    gap: string;
    layout: 'masonry' | 'standard' | 'featured';
}

export interface GrydItem {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    author: string;
    publishDate: Date;
    readTime: number;
    url: string;
}

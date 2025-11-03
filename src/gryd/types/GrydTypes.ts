export type GridLayout = 'masonry' | 'standard' | 'featured'

export type GridColumns = 1 | 2 | 3 | 4

export interface GrydConfig {
    columns: GridColumns;
    gap: string;
    enableHover: boolean;
    showCategory: boolean;
    showAuthor: boolean;
    showReadTime: boolean;
}

export interface GrydFilters {
    category?: string;
    author?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

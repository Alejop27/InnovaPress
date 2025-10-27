export interface NavbarData {
    breadcrumbs: Breadcrumb[];
    showSearch: boolean;
    showUserMenu: boolean;
    currentSection: string;
}

export interface Breadcrumb {
    label: string;
    url: string;
    isActive: boolean;
}

export interface NavItem {
    label: string
    url: string
    icon?: string
}

export interface HeaderConfig {
    logo: string
    siteName: string
    navItems: NavItem[]
    showUserMenu: boolean
}

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}
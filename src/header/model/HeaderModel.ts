import { NavItem, HeaderConfig, User } from '../types/HeaderTypes'

export default class HeaderModel {
    private logo: string = '/assets/images/logo.png'
    private siteName: string = 'INNOVAPRESS'
    private navItems: NavItem[] = [
        { label: 'Inicio', url: '/', icon: 'home' },
        { label: 'Categorías', url: '/categorias', icon: 'grid' },
        { label: 'Favoritos', url: '/favoritos', icon: 'heart' },
        { label: 'Pauta con Nosotros', url: '/submit-news', icon: 'send' }
    ]
    private currentUser: User | null = null
    private showUserMenu: boolean = false

    getConfig(): HeaderConfig {
        return {
            logo: this.logo,
            siteName: this.siteName,
            navItems: this.navItems,
            showUserMenu: this.showUserMenu
        }
    }

    setLogo(logo: string): void {
        this.logo = logo
    }

    setSiteName(name: string): void {
        this.siteName = name
    }

    getNavItems(): NavItem[] {
        return this.navItems
    }

    setCurrentUser(user: User | null): void {
        this.currentUser = user
    }

    getCurrentUser(): User | null {
        return this.currentUser
    }

    isUserLoggedIn(): boolean {
        return this.currentUser !== null
    }

    toggleUserMenu(): void {
        this.showUserMenu = !this.showUserMenu
    }

    closeUserMenu(): void {
        this.showUserMenu = false
    }
}
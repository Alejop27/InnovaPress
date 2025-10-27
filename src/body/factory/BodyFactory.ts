import { Router } from 'express'
import BodyView from '../view/BodyView'
import BodyRouter from '../router/BodyRouter'

export default class BodyFactory {
    public readonly view: BodyView
    public readonly router: Router

    private constructor(view: BodyView, router: BodyRouter) {
        this.view = view
        this.router = router.router
    }

    static createComponent(): BodyFactory {
        const view = new BodyView()
        const router = new BodyRouter(view)
        return new BodyFactory(view, router)
    }

    static createComponentWithConfig(
        layout: 'single-column' | 'two-column' | 'three-column',
        backgroundColor: string = '#ffffff',
        maxWidth: string = '1200px'
    ): BodyFactory {
        const view = new BodyView()
        const router = new BodyRouter(view)

        // Configurar el view con los parámetros
        view.updateLayout(layout)
        view.updateBackgroundColor(backgroundColor)
        view.updateMaxWidth(maxWidth)

        return new BodyFactory(view, router)
    }

    // Método para obtener solo el router si se necesita
    getRouter(): Router {
        return this.router
    }

    // Método para obtener solo el view si se necesita
    getView(): BodyView {
        return this.view
    }
}
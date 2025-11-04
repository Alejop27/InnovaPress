
import { SubmitNewsForm, SubmitConfig } from '../types/SubmitNewsTypes'

export default class SubmitNewsModel {
    private submittedForms: SubmitNewsForm[] = []
    private subjects: string[] = [
        'Integrador I',
        'Integrador II',
        'Integrador III',
        'Ing Software',
        'Estructura Datos',
        'Sistemas Distribuidos'
    ]
    private maxFileSize: number = 5242880 // 5MB

    getConfig(): SubmitConfig {
        return {
            subjects: this.subjects,
            maxFileSize: this.maxFileSize
        }
    }

    submitForm(form: SubmitNewsForm): { success: boolean; message: string } {
        if (!form.name || !form.email || !form.subject) {
            return { success: false, message: 'Faltan campos obligatorios' }
        }

        const newForm: SubmitNewsForm = {
            ...form,
            id: Date.now().toString(),
            submittedDate: new Date().toISOString().split('T')[0],
            status: 'pending'
        }

        this.submittedForms.push(newForm)
        return { success: true, message: 'Formulario enviado correctamente' }
    }

    getAllSubmissions(): SubmitNewsForm[] {
        return this.submittedForms
    }

    getSubmissionById(id: string): SubmitNewsForm | undefined {
        return this.submittedForms.find(f => f.id === id)
    }
}

export interface SubmitNewsForm {
    id?: string
    name: string
    email: string
    subject: string
    newsInfo: string
    image?: string
    submittedDate?: string
    status?: 'pending' | 'approved' | 'rejected'
}

export interface SubmitConfig {
    subjects: string[]
    maxFileSize: number
}
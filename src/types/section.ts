import { TaskProps } from "./task"

export interface SectionProps {
    id: string
    title: string
    bgColor: string
    icon?: string

    tasks: TaskProps[]
}
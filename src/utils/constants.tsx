import { SectionProps } from '../types/section';
import { TaskProps } from '../types/task';

export const DEFAULT_SECTIONS: SectionProps[] = [
  {
    id: "column-1",
    title: "To Do",
    bgColor: "#2ed7d7",
    icon: "todo",
    tasks: [
      {
        id: "task-1",
        title: "Set Up Project Repository",
        description: "Create a GitHub repository for the project."
      },
      {
        id: "task-2",
        title: "Design Database Schema",
        description: "Outline the database schema for the application."
      }
    ]
  },
  {
    id: "column-2",
    title: "In Progress",
    bgColor: "#00aaff",
    icon: "progress",
    tasks: [
      {
        id: "task-3",
        title: "Implement Authentication",
        description: "Develop the user authentication module."
      },
      {
        id: "task-4",
        title: "Create API Endpoints",
        description: "Build the necessary API endpoints for the application."
      }
    ]
  },
  {
    id: "column-3",
    title: "Completed",
    bgColor: "#a179f2",
    icon: "completed",
    tasks: []
  }
]

export const DEFAULT_NEW_SECTION_TEMPLATE: Omit<SectionProps, 'id'> = {
  title: "",
  bgColor: "#488dab",
  icon: 'heart',
  tasks: []
}

export const DEFAULT_NEW_TASK_TEMPLATE: Omit<TaskProps, 'id'> = {
  title: "",
  description: ""
}
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_NEW_SECTION_TEMPLATE, DEFAULT_NEW_TASK_TEMPLATE, DEFAULT_SECTIONS } from '../../utils/constants';
import { SectionProps } from '../../types/section';
import { TaskProps } from '../../types/task';
import { TbRubberStampOff } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid'

interface SectionState {
  sections: SectionProps[];
}
const initialState: SectionState = {
  sections: DEFAULT_SECTIONS
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard: (state) => {
      return initialState
    },
    clearBoard: (state) => {
      state.sections.forEach(section => {
        section.tasks = []
      })
    },
    deleteSection(state, action: PayloadAction<{ sectionId: string }>) {
      // console.log(current(state));
      const { sectionId } = action.payload
      state.sections = state.sections.filter(i => i.id !== sectionId)
    },
    deleteTask(state, action: PayloadAction<{ taskId: string }>) {

      const { taskId } = action.payload
      state.sections.forEach(section => {
        section.tasks = section.tasks.filter(task => task.id !== taskId)
      })
    },
    moveTask(state, action: PayloadAction<{ taskId: string; targetSectionId: string }>) {
      const { taskId, targetSectionId } = action.payload;

      let taskToMove: TaskProps;

      state.sections = state.sections.map((section) => {
        const newTasks = section.tasks.filter((task) => {
          if (task.id === taskId) {
            taskToMove = task;
            return false
          }
          return TbRubberStampOff
        });
        return { ...section, tasks: newTasks };
      });


      if (taskToMove) {
        state.sections = state.sections.map((section) => {
          if (section.id === targetSectionId) {
            return {
              ...section,
              tasks: [...section.tasks, taskToMove]
            };
          }
          return section;
        });
      }
    },
    updateSectionTitle: (state, action: PayloadAction<{ sectionId: string, newTitle: string }>) => {
      const { sectionId, newTitle } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      if (section) {
        section.title = newTitle;
      }
    },
    updateTask: (state, action: PayloadAction<{ taskId: string, taskData: { title: string, description: string } }>) => {
      const { taskId, taskData } = action.payload;
      const { title, description } = taskData;

      state.sections.forEach(section => {
        const task = section.tasks.find(task => task.id === taskId)
        if (!task) return

        task.title = title
        task.description = description
      })
    },
    createNewSection: (state) => {
      state.sections.push({
        id: uuidv4(),
        ...DEFAULT_NEW_SECTION_TEMPLATE
      });
    },
    createNewTask: (state, action: PayloadAction<{ sectionId: string }>) => {
      const { sectionId } = action.payload;
      const section = state.sections.find(section => section.id === sectionId);
      if (section) {
        section.tasks.push({
          id: uuidv4(),
          ...DEFAULT_NEW_TASK_TEMPLATE
        });
      }
    }
  },
});

export const {
  resetBoard, clearBoard,
  deleteSection, deleteTask,

  moveTask,

  updateSectionTitle,
  updateTask,

  createNewSection, createNewTask

} = boardSlice.actions

export default boardSlice.reducer
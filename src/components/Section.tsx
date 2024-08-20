import { FaEraser, FaPlusCircle, FaSave } from 'react-icons/fa'
import Task from './Task'
import { useEffect, useState } from 'react'

import { useDrop } from 'react-dnd'
import { TaskProps } from '../types/task'
import { SectionProps } from '../types/section'

import { createNewTask, deleteSection, updateSectionTitle } from '../redux/features/boardSlice'
import { useAppDispatch } from '../hooks/useRedux'
import icons from '../utils/icons'
import Swal from 'sweetalert2'

interface SectionComponentProps {
    section: SectionProps
    isIndexEven: boolean
    moveTask: (taskId: string, targetSectionId: string) => void
}

const Section: React.FC<SectionComponentProps> = ({ section, isIndexEven, moveTask }) => {
    const { title, bgColor, icon, tasks } = section

    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const [currTitle, setCurrTitle] = useState(title)
    const [currTasks, setCurrTasks] = useState(tasks)

    useEffect(() => { setCurrTasks(tasks) }, [tasks])

    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { taskId: string }) => moveTask(item.taskId, section.id)
    })

    const handleTitleSubmit = () => {
        dispatch(updateSectionTitle({ sectionId: section.id, newTitle: currTitle }))
    }

    const handleCreateTask = () => {
        dispatch(createNewTask({ sectionId: section.id }))
    }

    const handleDeleteSection = async () => {

        const result = await Swal.fire({
            title: "Do you want to delete section and their tasks?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc2626"
        })
        if (!result.isConfirmed)
            return

        dispatch(deleteSection({ sectionId: section.id }));
    }

    return (
        <div style={{ backgroundColor: isIndexEven ? "#edeff0" : "#f0f3f4" }} className="flex-1 shadow">
            <div style={{ backgroundColor: bgColor }} className="text-white">
                <div className="flex items-center gap-x-0.5 text-xl h-16 px-4 shadow">
                    <div>
                        {icon && icon in icons ? icons[icon as keyof typeof icons] : null}
                    </div>
                    <div className={`${isEditing && "bg-black !bg-opacity-15"} flex-1 relative mx-2 rounded font-semibold hover:bg-black hover:bg-opacity-10 hover:cursor-text`}>
                        <input type="text" className="w-full px-2 py-1 text-white bg-transparent outline-none placeholder-gray-100 placeholder:text-sm" placeholder="Enter section title..."
                            value={currTitle}
                            onFocus={() => setIsEditing(true)}
                            onBlur={() => setTimeout(() => setIsEditing(false), 150)}
                            onChange={(e) => setCurrTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                        />
                        {isEditing && <button onClick={handleTitleSubmit} className="w-8 h-8 absolute right-0.5 top-0.5"><FaSave className="mx-auto" /></button>}
                    </div>
                    {
                        tasks.length > 0 &&
                        <div className="w-6 h-6 flex justify-center items-center bg-black bg-opacity-15 rounded-full">
                            <span className="text-xs font-bold">{tasks.length}</span>
                        </div>
                    }
                    <button onClick={handleDeleteSection} className="w-6 h-6 flex justify-center items-center bg-red-500 bg-opacity-90 rounded-full">
                        <span className="text-xs"><FaEraser /></span>
                    </button>
                </div>
            </div>

            <div ref={drop} className="h-[calc(100vh-4.5rem)]">
                {currTasks.map((task: TaskProps) => (
                    <Task key={task.id} task={task} />
                ))}

                <div className="flex justify-center mt-2">
                    <button onClick={handleCreateTask} className="bg-black rounded-full">
                        <FaPlusCircle className="mx-auto text-[#ececec]" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Section
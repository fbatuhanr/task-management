import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { TaskProps } from '../types/task'
import Swal from 'sweetalert2'
import { useAppDispatch } from '../hooks/useRedux'
import { deleteTask, updateTask } from '../redux/features/boardSlice'
import { FaComment, FaEraser, FaList } from 'react-icons/fa'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface TaskComponentProps {
  task: TaskProps
}

const Task: React.FC<TaskComponentProps> = ({ task }) => {

  const dispatch = useAppDispatch();

  const [currTitle, setCurrTitle] = useState(task.title)
  const [currDescription, setCurrDescription] = useState(task.description || "")

  const [, drag] = useDrag({
    type: 'TASK',
    item: { taskId: task.id },
  });

  const handleDelete = async () => {

    const result = await Swal.fire({
      title: "Do you want to delete task?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626"
    })
    if (!result.isConfirmed)
      return

    dispatch(deleteTask({ taskId: task.id }));
  }

  const handleTaskModal = async () => {

    const result = await MySwal.fire({
      title: 'Edit Task',
      customClass: {
        popup: 'w-full md:w-1/2'
      },
      html: (<div className="w-auto">
        <div className="mb-4">
          <div className="text-left font-semibold text-xl">Title</div>
          <div>
            <input id={`task-input-${task.id}`} className="border w-full p-3 rounded" placeholder="Type title here..." defaultValue={currTitle} />
          </div>
        </div>
        <div>
          <div className="text-left font-semibold text-xl">Description</div>
          <div>
            <textarea id={`task-desc-${task.id}`} rows={4} className="border w-full p-3 rounded" placeholder="Type description here..." defaultValue={currDescription} />
          </div>
        </div>
      </div>),
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const title = (document.getElementById(`task-input-${task.id}`) as HTMLInputElement)?.value;
        const description = (document.getElementById(`task-desc-${task.id}`) as HTMLTextAreaElement)?.value;

        if (!title || !description) {
          MySwal.showValidationMessage('Title or description not be empty!');
          return false;
        }

        setCurrTitle(title)
        setCurrDescription(description)

        return { title, description };
      },
    })
    console.log(result);

    if (!result.isConfirmed)
      return

    const { title, description } = result.value
    dispatch(updateTask({ taskId: task.id, taskData: { title, description } }))
  }

  return (
    <div ref={drag} className="task cursor-pointer border px-3.5 py-3 m-2 rounded-lg bg-white">
      <div className="flex justify-between">
        <div className="flex-1">
          <p onClick={handleTaskModal} className="text-lg font-medium">{currTitle ? currTitle : "click here for edit title..."}</p>
        </div>
        <button onClick={handleDelete} className="z-10 task-delete-button opacity-0 w-6 h-6 flex justify-center items-center bg-red-500 rounded-full transition-opacity">
          <span className="text-xs text-white"><FaEraser /></span>
        </button>
      </div>
      <div className="mt-1 mb-2">
        <p onClick={handleTaskModal} className="text-sm font-normal">{currDescription ? currDescription : "click here for edit description..."}</p>
      </div>
      {<div className="flex gap-x-3 text-xs text-[#b2b2b2]">
        <div className="flex items-center gap-x-1">
          <FaComment />
          <span className="text-[0.6rem]">1</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaList />
          <span className="text-[0.6rem]">1/1</span>
        </div>
      </div>}
    </div>
  )
}

export default Task
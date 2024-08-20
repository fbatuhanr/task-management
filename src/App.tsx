import { useEffect } from 'react'
import './App.css'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Section from './components/Section'
import { SectionProps } from './types/section'

import { FaEraser, FaPlus } from 'react-icons/fa'

import { RootState } from './redux/store'
import { clearBoard, createNewSection, moveTask, resetBoard } from './redux/features/boardSlice'
import { useAppDispatch, useAppSelector } from './hooks/useRedux'
import Swal from 'sweetalert2'
import { IoReload } from 'react-icons/io5'
import { TfiReload } from 'react-icons/tfi'
import { MdOutlineRestartAlt } from 'react-icons/md'


const App = () => {

  const { sections } = useAppSelector((state: RootState) => state.board);
  console.log(sections);

  const dispatch = useAppDispatch();

  const handleCreateSection = () => {
    dispatch(createNewSection());
  };

  useEffect(() => {
    console.log("section updated: ", sections);

  }, [sections])


  const handleMoveTask = (taskId: string, targetSectionId: string) => {

    dispatch(moveTask({ taskId, targetSectionId }));
  };

  const handleReset = async () => {

    const result = await Swal.fire({
      title: "Do you want to reset all?",
      showCancelButton: true,
      confirmButtonText: "Reset",
      confirmButtonColor: "#dc2626"
    })
    if (!result.isConfirmed)
      return

    dispatch(resetBoard())
    window.location.reload()
  }

  const handleClear = async() => {
    const result = await Swal.fire({
      title: "Do you want to clear all tasks?",
      showCancelButton: true,
      confirmButtonText: "Clear",
      confirmButtonColor: "#dc2626"
    })
    if (!result.isConfirmed)
      return

    dispatch(clearBoard())
  }

  return <div>
    {
      <div className="flex font-open-sans">
        <DndProvider backend={HTML5Backend}>
          {
            sections.length > 0 && sections.map((section: SectionProps, index: number) => (
              <Section
                key={section.id}
                section={section}
                isIndexEven={index % 2 === 1}
                moveTask={handleMoveTask}
              />
            ))
          }
        </DndProvider>
        <div style={{ backgroundColor: sections.length % 2 === 1 ? "#edeff0" : "#f0f3f4" }} className="flex-1 shadow">
          <div style={{ backgroundColor: sections.length % 2 === 1 ? "#edeff0" : "#f0f3f4" }} className="text-[#00aaff]">
            <button onClick={handleCreateSection} className="w-full flex justify-between items-center h-16 px-5 shadow">
              <div className="flex items-center gap-x-3 text-xl">
                <FaPlus />
                <h3 className="font-medium">Add Section</h3>
              </div>
            </button>
          </div>
        </div>
      </div>
    }

    <div className="fixed right-4 bottom-2">
      <button onClick={handleReset} className="bg-red-400 text-white rounded w-12 h-8 mr-1">
        <MdOutlineRestartAlt className="mx-auto text-lg" />
      </button>
      <button onClick={handleClear} className="bg-red-600 text-white rounded w-12 h-8">
        <TfiReload className="mx-auto text-lg" />
      </button>
    </div>
  </div>
}
export default App
import { useEffect, useRef, useState } from "react"
import { Task } from "../../../data/Task"
import { useSwipeable } from "react-swipeable"
import { BacklogService } from "../../../../../services/CommonServicesIndex"
import { useModal } from "../../../../../hooks/useModal"
import TaskEdit from "./TaskEdit"

interface Props {
    task: Task
}

export function TaskListItem({task}: Props) {
    const showModal = useModal()
    const [swipeAmount, setSwipeAmount] = useState(0)
    const [isRemoved, setIsRemoved] = useState(false)
    const rowRef = useRef<HTMLLIElement>(null)

    const deleteTask = async () => {
        await BacklogService.deleteTask(task.id)
        setIsRemoved(true)
    }

    const editTask = async () => {
        showModal((<TaskEdit taskID={task.id} featureGuid={task.featureGuid} reload={() => {}}/>), "Edit Task")
    }

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            setSwipeAmount(eventData.deltaX)
        },
        onSwiped: () => {
            if (swipeAmount > 100) {
                deleteTask()
            } else if (swipeAmount < -100) {
                editTask()
            }
            setSwipeAmount(0)
        },
        trackMouse: true
    });

    useEffect(() => {
        if (rowRef.current) {
            rowRef.current.style.setProperty('--swipe-amount', `${swipeAmount}px`)
        }
    }, [swipeAmount])
  
    return (
        isRemoved == true ? 
        <div></div>
        :
        <li 
            {...swipeHandlers} 
            ref={rowRef}
            className={`list-group-item d-flex w-100 swipeable-row ${swipeAmount !== 0 ? 'swiping' : ''}`}
            style={{
                touchAction: 'none',
                userSelect: 'none',
                cursor: 'grab',
            }}>
            {task.name}
        </li>
    )
}
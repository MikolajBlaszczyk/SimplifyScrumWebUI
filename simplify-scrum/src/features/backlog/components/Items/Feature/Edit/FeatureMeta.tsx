import { MouseEvent, useEffect, useState } from "react"
import { useAlert, useBacklog, useModal } from "../../../../../../hooks/HooksIndex"
import { BacklogService } from "../../../../../../services/CommonServicesIndex"
import { AlertStyle } from "../../../../../alerting/components/Alert"
import { Task } from "../../../../data/DataIndex"
import { Button, StandardList, StandardSwipeElement } from "../../../../../../components/ComponentsIndex"
import TaskEdit from "../../Task/TaskEdit"
import { Role, Size, Style } from "../../../../../../components/common/button/ButtonProps"

interface Props {
    guid?: string
}

export function FeatureMeta({guid}: Props){
    const showAlert = useAlert()
    const showModal = useModal()
    const [tasks, setTasks] = useState<Task[]>([])

    const addTask = () => {
        showModal((<TaskEdit featureGuid={guid} reload={fetchData}/>), "New Task")
    }

    const deleteTask = async (taskId: number) => {
        const response = await BacklogService.deleteTask(taskId)
        if(response){
            fetchData()
            showAlert(AlertStyle.Success, "Task was deleted", "Success")
        } else {
            showAlert(AlertStyle.Danger, "Task was not deleted", "Error")
        }
    }

    const editTask = (taskId: number) => {
        showModal((<TaskEdit taskID={taskId} featureGuid={guid} reload={fetchData}/>), "Edit Task")
    }

    const fetchData = async () => {
        if(guid == undefined || guid.length == 0)
            return 

        try{
            const featureList =  await BacklogService.getTasksForFeature(guid)
            setTasks(featureList)
        } catch(err) {
            console.log(err)
            showAlert(AlertStyle.Danger, "Task were not retrieved", "Error")
        }
    }

    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <div className="d-flex w-75  mt-3 mb-3 feature-meta rounded">
            <section className="d-flex flex-column w-100 p-3">
                 <StandardList
                    title="Tasks"
                    content={
                        tasks.length == 0 ? 
                        [
                            <div className="d-flex w-100  ">
                                No tasks
                            </div>
                        ]
                        :
                        [...tasks.map(task => {
                        return (
                            <div className="w-100 d-flex justify-content-between">
                                {task.name}
                                <div>
                                    <Button 
                                        className="s-task-item-button me-3"                  
                                        size={Size.Large}
                                        role={Role.Primary}
                                        style={Style.Borderless}
                                        icon="bi-pen"
                                        onClick={() => {editTask(task.id)}} />

                                    <Button 
                                        className="s-task-item-button"
                                        size={Size.Large}
                                        role={Role.Primary}
                                        style={Style.Borderless}
                                        icon="bi-trash"
                                        onClick={() => {deleteTask(task.id)}} />
                                </div>
                            </div>     
                        )
                        }),
                        ]
                    } />

                <Button 
                                    style={Style.Borderless}
                                    size={Size.XLarge}
                                    role={Role.Primary}
                                    className="mb-4"
                                    icon="bi-plus-lg" 
                                    onClick={() =>{addTask()}} />
              
               
            </section>
        </div>
    )
}
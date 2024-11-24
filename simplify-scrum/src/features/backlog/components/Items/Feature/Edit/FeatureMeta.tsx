import { useEffect, useState } from "react"
import { useAlert, useModal } from "../../../../../../hooks/HooksIndex"
import { BacklogService } from "../../../../../../services/CommonServicesIndex"
import { AlertType } from "../../../../../alerting/components/Alert"
import { Task } from "../../../../data/DataIndex"
import { Button, Color, SimpleButton } from "../../../../../../components/ComponentsIndex"
import { Fonts } from "../../../../../../utils/UtilsIndex"
import TaskEdit from "../../Task/TaskEdit"
import { TaskListItem } from "../../Task/TaskListItem"

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

    const fetchData = async () => {
        if(guid == undefined || guid.length == 0)
            return 

        try{
            const featureList =  await BacklogService.getTasksForFeature(guid)
            setTasks(featureList)
        } catch(err) {
            console.log(err)
            showAlert(AlertType.Danger, "Task were not retrieved", "Error")
        }
    }

    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <div className="d-flex w-100 h-100">
            <section className="d-flex flex-column w-100">
                <div className="d-flex w-100 justify-content-center mt-2 border-bottom">
                    <h4>Tasks</h4>
                </div>

                <div className="d-flex w-100">
                    <ul className="d-flex w-100 mt-2 list-group overflow-hidden">
                        {
                            tasks.length == 0 ? 
                            (
                                <div className="d-flex flex-column w-100 align-items-center mt-4">
                                    <h5 >No Tasks in project</h5>
                                </div>
                            )
                            :
                            tasks.map(task => {
                            return (
                                <TaskListItem task={task} />
                            )
                            })
                        }
                    </ul>
                </div>
                
                <div className="p-1 d-flex w-100 justify-content-center">
                    <SimpleButton
                            type={Button.Borderless}
                            title=""
                            fontColor={Color.Light}
                            font={Fonts.H6}
                            icon="bi-plus-lg" 
                            onClick={() =>{addTask()}}/>
                </div>
               
            </section>
        </div>
    )
}
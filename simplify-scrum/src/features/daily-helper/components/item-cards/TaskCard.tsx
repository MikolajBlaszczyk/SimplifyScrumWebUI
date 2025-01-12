import { MouseEvent, useEffect, useState } from "react";
import { Button, TextInput } from "../../../../components/ComponentsIndex";
import { ExtendedDataLoader, User } from "../../../../data/CommonDataIndex";
import { EnumService } from "../../../../services/CommonServicesIndex";
import { Task } from "../../../backlog/data/Task";
import { AccountService } from "../../../account-settings/service/AccountService";
import { Role, Size, Style } from "../../../../components/common/button/ButtonProps";
import { useModal } from "../../../../hooks/useModal";
import TaskEdit from "../../../backlog/components/Items/Task/TaskEdit";
import { useLoading } from "../../../../hooks/useContexts";

interface TaskCardProps {
    task: Task
}


export function TaskCard({task}: TaskCardProps){
    const {shouldReload, setShouldReload} = useLoading()
    const showModal = useModal()
    const [assigneLoader, setAssigneLoader] = useState<ExtendedDataLoader<User>>(ExtendedDataLoader.default())

    const fetchAssigne = async () => {
        try {
            const users = await AccountService.getUsers()
            const assigne = users.find(user => user.id == task.assignee)
            if(assigne != null) {   
                setAssigneLoader(ExtendedDataLoader.dataFinishedLoading(assigneLoader, assigne, false))
            } else {
                setAssigneLoader(ExtendedDataLoader.dataFinishedLoading(assigneLoader, null, true))
            }

        } catch(err) {

        }
    }

    useEffect(() => {
        fetchAssigne()
    }, [])

    return(
           <div className={"d-flex overflow-hidden daily-item-card flex-column m-2 justify-content-start align-items-center border rounded "}>
                <div className="d-flex p-2 border-bottom  daily-item-card-header h-25 s-bg-dark border-bottom justify-content-between align-items-center w-100">
                    <h6 className="mb-0">
                        {task.name} 
                    </h6>

                    <Button 
                        className="s-button-icon"
                        icon="bi-three-dots"
                        role={Role.Primary}
                        style={Style.Borderless}
                        size={Size.Large}
                        onClick={() => {
                            showModal(
                                <TaskEdit taskID={task.id} reload={() => {
                                    setShouldReload(shouldReload + 1)
                                }} />,
                                "Edit Task"
                            )
                        }} />
                </div>
    
                <div className="d-flex flex-column  w-100 h-75  daily-item-card-body  position-relative" style={{minHeight: '100px'}}>
                        <div className="w-100 p-2 d-flex justify-content-between  position-absolute top-0 start-50 translate-middle-x">
                            <p className="mb-0">
                                {EnumService.convertSimpleStatusToString(task.state)}
                            </p>
                            
                        </div>
                        <div className="w-100 p-2 d-flex justify-content-between position-absolute bottom-0 start-50 translate-middle-x">
                            <div className="d-flex w-50 align-items-center ">
                                <p className="mb-0 me-1">Assigne: </p>
                                <p className="mb-0 s-elipsis  overflow-hidden">
                                       {assigneLoader.placeholder ? 
                                        "Loading..." 
                                        :
                                            assigneLoader.isEmpty ? 
                                            "Unassigned"
                                            :
                                            assigneLoader.data!.nickname
                                    } 
                                </p>
                            </div>
                            

                            <p className="mb-0">
                                {new Date(task.lastUpdateOn).toLocaleDateString()}
                            </p>
                        </div>
                        
                </div>
            </div>
    )
}
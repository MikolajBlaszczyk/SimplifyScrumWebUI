import { MouseEvent, useEffect, useMemo, useState } from "react"
import { SimpleStatus } from "../../../data/State"
import { Feature } from "../../../data/Feature"
import { User } from "../../../../../data/CommonDataIndex"
import { Button, Color, SelectItem, SimpleButton, SimpleSelectionInput, SimpleTextInput } from "../../../../../components/ComponentsIndex"
import { BacklogService, EnumService } from "../../../../../services/CommonServicesIndex"
import { BgColor, FontColor } from "../../../../../utils/UtilsIndex"
import { GenericEnumService } from "../../../../../services/enum/GenericEnumService"
import { AccountService } from '../../../../account-settings/service/AccountService';
import { Task } from "../../../data/Task"

interface Props {
    featureGuid?: string
    taskID?: number
    reload: () => void
}

export default function TaskEdit({taskID, featureGuid, reload}: Props) {
    const [name, setName] = useState<string>('')
    const [status, setStatus] = useState<SimpleStatus>(SimpleStatus.ToBeDone)
    const [assigne, setAssigne] = useState<User>(User.default())
    const [users, setUsers] = useState<User[]>([])

    let assigneOptions = useMemo(() => {
        const assignes = users.map(user => {
            const item: SelectItem = {
                description: user.nickname,
                value: user.id
            }

            return item
        })
        assignes.push({description:"Not assgined", value: ""})
        return assignes
    }, [users])
    

    let statusOptions: SelectItem[] = useMemo(() => {
        return GenericEnumService.getEnumNames(SimpleStatus)
        .map( state => {
            const item: SelectItem = {
                value: state,
                description:state 
            }

            return item
        })
    }, [])

    const setNewStatusValue = (stringValue: string) => {
        const newState = EnumService.convertStringToSimpleStatus(stringValue)
        setStatus(newState)
    }

    const setNewAssignee = (guid: string) => {
        const newAssignee = users.filter(user => user.id == guid)
        if(newAssignee.length == 1){
            setAssigne(newAssignee[0])
        }
    }

    const fetchData = async () => {
        const teamMembers = await AccountService.getTeamMembers()
        setUsers(teamMembers)

        if(taskID == undefined)
            return

        const task = await BacklogService.getTask(taskID)
        setName(task.name)
        setStatus(task.state)
        const members = teamMembers.filter(member => member.id == task.assignee)
        if(members.length == 1)
        {
            setAssigne(members[0])
        }
        
    }

    const saveTask = async () => {
        if(featureGuid == undefined || featureGuid.length == 0)
            return 

        const task = new Task(-1, name, status, featureGuid!, assigne.id, '', new Date(), '', new Date())
        await BacklogService.addTask(task)

        reload()
    }

    useEffect(() => {
        fetchData()
    }, [])
  
    return(
        <div className="d-flex flex-column w-100 mt-4">
            <SimpleTextInput 
                icon="bi-alphabet"
                label="Name"
                fontcolor={FontColor.Dark}
                color={BgColor.Dark}
                value={name}
                changeValue={e => setName(e.target.value)} />
            <div className="mt-2"></div>
            <SimpleSelectionInput 
                label="state"
                icon="bi-check-all"
                selectedValue={EnumService.convertSimpleStatusToString(status)}
                onSelectedValueChange={e => setNewStatusValue(e)} 
                options={statusOptions}/>
            <div className="mt-2"></div>
            <SimpleSelectionInput 
                label="asignee"
                icon="bi-person-fill"
                selectedValue={assigne.id} 
                onSelectedValueChange={(guid) => {setNewAssignee(guid)}} 
                options={assigneOptions}                />


            <div className="d-flex w-100 justify-content-center mt-3">
                <SimpleButton 
                    type={Button.Borderless} 
                    fontColor={Color.Light}
                    title={taskID == undefined ? "Save" : "Update"} 
                    onClick={() => { saveTask()}}/>
            </div>
           
        </div>
    )
}
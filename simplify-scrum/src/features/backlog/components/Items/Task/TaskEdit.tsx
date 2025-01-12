import { MouseEvent, useEffect, useMemo, useState } from "react"
import { SimpleStatus } from "../../../data/State"
import { Feature } from "../../../data/Feature"
import { User } from "../../../../../data/CommonDataIndex"
import { Button, SelectionInput, SelectItem, SimpleSelectionInput, SimpleTextInput, TextInput } from "../../../../../components/ComponentsIndex"
import { BacklogService, EnumService } from "../../../../../services/CommonServicesIndex"
import { BgColor, FontColor } from "../../../../../utils/UtilsIndex"
import { GenericEnumService } from "../../../../../services/enum/GenericEnumService"
import { AccountService } from '../../../../account-settings/service/AccountService';
import { Task } from "../../../data/Task"
import { Role, Size, Style } from "../../../../../components/common/button/ButtonProps"
import { SelectState, TextState } from "../../../../../components/form/shared/SharedProps"
import { useHideModal, useModal } from '../../../../../hooks/useModal';

interface Props {
    featureGuid?: string
    taskID?: number
    reload: () => void
}

export default function TaskEdit({taskID, featureGuid, reload}: Props) {
    const hideModal = useHideModal()
    const [nameState, setNameState] = useState<TextState>({value: "", validation: {isValid: true, message: ""}})
    const [statusState, setStatusState] = useState<SelectState>({value: undefined, validation: {isValid: true, message: ""}})
    const [assigneState, setAssigneState] = useState<SelectState>({value: undefined, validation: {isValid: true, message: ""}})

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
        return Object.values(GenericEnumService.getEnumDictionary(SimpleStatus)) 
        .map( state => {
            const item: SelectItem = {
                value: state.toString(),
                description: EnumService.convertSimpleStatusToString(state) 
            }

            return item
        })
    }, [])

    const fetchData = async () => {
        const teamMembers = await AccountService.getTeamMembers()
        setUsers(teamMembers)

        if(taskID == undefined)
            return

        const task = await BacklogService.getTask(taskID)
        setNameState(prev => ({...prev, value: task.name}))
        setStatusState(prev => ({...prev, value: task.state.toString()}))
        const members = teamMembers.filter(member => member.id == task.assignee)
        if(members.length == 1) {
            setAssigneState(prev => ({...prev, value: members[0].id}))
        }
        
    }

    const saveTask = async () => {
        if(featureGuid == undefined || featureGuid.length == 0)
            return 

        const task = new Task(
            -1,
            nameState.value,
            parseInt(statusState.value!),
            featureGuid!,
            assigneState.value!,
            '',
            new Date(),
            '',
            new Date())
        await BacklogService.addTask(task)

        reload()
    }

    const updateTask = async () => {
        const task = await BacklogService.getTask(taskID!)

        task.name = nameState.value
        task.state = parseInt(statusState.value!)
        if(assigneState.value == "")
            task.assignee = null
        else
            task.assignee = assigneState.value!
        await BacklogService.updateTask(task)

        reload()
    }


    useEffect(() => {
        fetchData()
    }, [])
  
    return(
        <div className="d-flex flex-column w-100 mt-4">
            <TextInput 
                value={nameState.value}
                validation={nameState.validation}
                icon="bi-alphabet"
                placeholder="Name" 
                changeValue={e => setNameState(prev => ({...prev, value: e})) } />

            <SelectionInput
                className="mt-3"
                icon="bi-check-all"
                selectedValue={statusState.value} 
                placeholder="Status"
                onSelectedValueChange={e => setStatusState(prev => ({...prev, value: e}))} 
                options={statusOptions} />
        
            <SelectionInput 
                icon="bi-person-fill"
                className="mt-3"
                placeholder="Asignee"
                onSelectedValueChange={(e) => {setAssigneState(prev => ({...prev, value: e}))}}
                options={assigneOptions} />
       


            <div className="d-flex w-100 justify-content-center mt-3">
                <Button 
                    style={Style.Filled}
                    role={Role.Primary}
                    size={Size.Large}
                    title={taskID == undefined ? "Save" : "Update"} 
                    onClick={() => {
                        taskID == undefined ? saveTask() : updateTask()
                        hideModal()
                    }} />
            </div>
           
        </div>
    )
}
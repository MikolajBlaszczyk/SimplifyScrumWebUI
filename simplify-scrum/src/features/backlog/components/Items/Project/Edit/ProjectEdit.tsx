import { useEffect, useMemo, useState } from "react"
import { StandardStatus } from '../../../../data/State';
import { Team } from "../../../../../../data/CommonDataIndex";
import { Button, SelectionInput, SelectItem, TextInput } from "../../../../../../components/ComponentsIndex";
import { BacklogService, PermissionService } from '../../../../../../services/CommonServicesIndex';
import { EnumService } from '../../../../../../services/enum/StateEnumService';
import { GenericEnumService } from "../../../../../../services/enum/GenericEnumService";
import { AccountService } from "../../../../../account-settings/service/AccountService";
import { Project } from "../../../../data/DataIndex";
import { useAlert, useBacklog, useLoading } from "../../../../../../hooks/HooksIndex";
import { AlertStyle, AlertType } from "../../../../../alerting/components/Alert";
import { CheckState, SelectState, TextState, ValidationResult } from '../../../../../../components/form/shared/SharedProps';
import { MultiTextInput } from '../../../../../../components/form/text-input/MultiTextInput';
import { Style, Role } from '../../../../../../components/common/button/ButtonProps';
import { SwitchInput } from "../../../../../../components/form/switch-input/SwitchInput";
import { BacklogAction } from "../../../../../../context/BacklogContext";

interface Props {
    guid?: String
    className?: String
}



export default function ProjectEdit({guid, className}: Props) {
    const {state, setState} = useBacklog()
    const {shouldReload, setShouldReload} = useLoading()
    const showAlert = useAlert()
    const [isProjectOwner, setIsProjectOwner] = useState<boolean>(false)
    const [nameState, setNameState] = useState<TextState>({value: "", validation: {isValid:true, message: ""}})
    const [descriptionState, setDescriptionState] = useState<TextState>({ value: "", validation: { isValid: true, message: "" } })
    const [statusState, setStatusState] = useState<SelectState>({ value: undefined, validation: { isValid: true, message: "" } })
    const [teamState, setTeamState] = useState<SelectState>({ value: undefined, validation: { isValid: true, message: "" } })
    const [isActiveProjectState, setIsActiveProjectState] = useState<CheckState>({ checked: false, validation: { isValid: true, message: "" } })
    const [teams, setTeams] = useState<Team[]>([])

    let statusOptions: SelectItem[] = useMemo(() => {
        return GenericEnumService
        .getEnumNames(StandardStatus)
        .map(state => {
            const item: SelectItem = {
                value: state,
                description: state
            }
            return item
        })
    }, []) 
    
    let teamOptions: SelectItem[] = useMemo(() => {
        return  teams.map(team => {
                    const item: SelectItem = {
                        value: team.guid,
                        description: team.name
                    }
                    return item
                })
    }, [teams])

    const fetchData = async () => {
        if(guid != undefined){ 
            const project = await BacklogService.getProject(guid)
            setNameState(prev => ({...prev, value: project.name}))
            setStatusState(prev => ({...prev, value: EnumService.convertStandardStatusToString(project.state)}))
            setDescriptionState(prev => ({...prev, value: project.description ?? ""}))
            setIsActiveProjectState(prev => ({...prev, checked: project.isActive}))
            setTeamState(prev => ({...prev, value: project.teamGuid}))
        }

        const teams = await AccountService.getTeams()
        setTeams(teams)
      
        const userInfo = await AccountService.getInfo()
        setTeamState(prev => ({...prev, value: userInfo.teamGuid}))

    }

    const checkProjectOwner = async () => {
        const isPo = await PermissionService.isProjectOwner();
        setIsProjectOwner(isPo)
    }

    useEffect(() => {        
        fetchData()
        checkProjectOwner()
    }, [])


    const updateProjectAsync = async () => {
        const project = await BacklogService.getProject(guid!)
        project.name = nameState.value
        project.description = descriptionState.value
        if(statusState.value != undefined) project.state = EnumService.convertStringToStandardStatus(statusState.value)
        if(teamState.value != undefined) project.teamGuid = teamState.value
        project.isActive = isActiveProjectState.checked

        const isSuccess = await BacklogService.updateProject(project)

        if(isSuccess){
            showAlert(AlertStyle.Info, "Successfuly updated a project", "Success")
            setShouldReload(shouldReload + 1)
            setState({...state, action: BacklogAction.ShowProjects})
            return
        } else {
            showAlert(AlertStyle.Danger, "Error", "Error")
        }
    }


    const createProjectAsync = async () => {
        const userInfo = await AccountService.getInfo()
        const project = new Project(
            "",
            nameState.value,
            EnumService.convertStringToStandardStatus(statusState.value!),
            userInfo.teamGuid,
            userInfo.id,
            new Date(),
            userInfo.id,
            new Date(),
            isActiveProjectState.checked,
            descriptionState.value)

        const isSuccess =  await BacklogService.addProject(project)

        if(isSuccess) {
            showAlert(AlertStyle.Info, "Successfuly added a project", "Success")
            setShouldReload(shouldReload + 1)
            setState({...state, action: BacklogAction.ShowProjects})
            return
        } else {
            showAlert(AlertStyle.Danger, "Error", "Error")
        }
    
    }


    return (
        <section className={" w-75 p-3 mt-3 mb-5 d-flex flex-column overflow-y-auto justify-content-center s-settings-section project-edit " + className} style={{maxHeight: '400px'}}>
            <TextInput 
                value={nameState.value} 
                placeholder="Name"
                icon="bi-alphabet"
                tooltipContent="Name of the project."
                validation={nameState.validation}
                changeValue={(e) => {setNameState(prev => ({...prev, value: e}))}} />

            <MultiTextInput 
                className="mt-3"
                value={descriptionState.value}
                placeholder="Description"
                icon="bi-card-text"
                validation={descriptionState.validation}
                changeValue={(e) => setDescriptionState(prev => ({...prev, value: e})) } />

            <SelectionInput
                className="mt-3"
                placeholder="status"
                icon="bi-check-all"
                selectedValue={statusState.value}
                onSelectedValueChange={(e) => setStatusState(prev => ({...prev, value: e}))}
                options={statusOptions} />

            <SelectionInput
                className="mt-3"
                placeholder="team"
                icon="bi-people-fill"
                selectedValue={teamState.value}
                onSelectedValueChange={(e) => setTeamState(prev => ({...prev, value: e}))}
                options={teamOptions} />


            <SwitchInput 
                className="mt-3"
                icon="bi-check2"
                placeholder=" active"
                tooltipContent="Is project active"
                isChecked={isActiveProjectState.checked} 
                changeValue={(e) => {setIsActiveProjectState(prev => ({...prev, checked: e}))} } />
         

        <div className="mt-4 d-flex  justify-content-between">
                <Button 
                    style={Style.Filled}
                    role={Role.Destructive}
                    title={guid == undefined ? "Abort" : "Delete"} 
                    onClick={() => {showAlert(AlertStyle.Warning, "Not implemented yet", "NotImplementedYet TODO", AlertType.Confirm)}} />


                <Button 
                    style={Style.Filled}
                    role={Role.Primary}
                    title={guid == undefined ? "Save" : "Update"} 
                    onClick={() => { guid == undefined ? createProjectAsync() : updateProjectAsync()}}
                    />
        </div>
        </section>
    )
}
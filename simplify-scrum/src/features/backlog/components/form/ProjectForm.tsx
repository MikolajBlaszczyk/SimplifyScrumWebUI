import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { StandardStatus } from '../../data/State';
import { Team } from "../../../../data/CommonDataIndex";
import { Button, SelectItem, SimpleButton, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex";
import { BacklogService } from '../../../../services/CommonServicesIndex';
import { EnumService } from '../../../../services/enum/StateEnumService';
import { UserEditableSettings } from "../../../account-settings/components/UserEditableSettings";
import { GenericEnumService } from "../../../../services/enum/GenericEnumService";
import { AccountService } from "../../../account-settings/service/AccountService";
import { Fonts } from "../../../../utils/UtilsIndex";
import { create } from "domain";
import { Project } from "../../data/DataIndex";
import { useAlert } from "../../../../hooks/HooksIndex";
import { AlertType } from "../../../alerting/components/Alert";



export default function ProjectForm() {
    const showAlert = useAlert()
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [state, setState] = useState<StandardStatus>(StandardStatus.New)
    const [team, setTeam] = useState<Team>(Team.default())
    const [teams, setTeams] = useState<Team[]>([])

 

    let stateOptions: SelectItem[] = useMemo(() => {
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

    useEffect(() => {        
        AccountService
            .getTeams()
            .then(data => {
                console.log("Success")
                setTeams(data)
            })
            .catch(err => console.log(err))

        AccountService 
            .getInfo()
            .then(info => {
                const team =teams.filter(dataTeam => dataTeam.managerGuid == info.id)[0];
                setTeam(Team.default())
            })
    }, [])

    
    const setNewState = (stateAsString: string) => {
        setState(EnumService.convertStringToStandardStatus(stateAsString))
    }
    const setNewTeam = (teamGUID: string) => {
        const newTeam = teams.filter(team => team.guid == teamGUID)[0]
        setTeam(newTeam)
    }


    const createProjectAsync = async () => {
        const userInfo = await AccountService.getInfo()
        const project = new Project("", name, state, userInfo.teamGuid, userInfo.id,  new Date(), userInfo.id, new Date(), description)

       BacklogService.addProject(project)
            .then(() => showAlert(AlertType.Info, "Successfuly added a project", "Success"))
            .catch(err => showAlert(AlertType.Danger, "Error", "Error"))
    
    }

    const createProject = () => { createProjectAsync() }


    return (
        <section className="bg-dark s-settings-section">
            <UserEditableSettings
                icon={"bi-alphabet"} 
                label={"Name"} 
                value={name} 
                onChange={(e) => {setName(e.target.value)}} />
            <SimpleMultiLineTextInput
                label="Description"
                icon="bi-card-text"
                value={description} 
                onChange={(e) => {setDescription(e.target.value)}} />
            <SimpleSelectionInput 
                label="State"
                icon="bi-check-all"
                selectedValue={EnumService.convertStandardStatusToString(state)}
                onSelectedValueChange={e => {setNewState(e)}}
                options={stateOptions} /> 
            <SimpleSelectionInput 
                label="Team"
                icon="bi-people-fill"
                selectedValue={team.guid}
                onSelectedValueChange={e => {setNewTeam(e)}}
                options={teamOptions} /> 

            <div className="mt-4 d-flex justify-content-end">
                <SimpleButton 
                    type={Button.Primary}
                    title={"Save"} 
                    font={Fonts.H5}
                    onClick={() => {createProject()}} />
            </div>
        </section>
    )
}
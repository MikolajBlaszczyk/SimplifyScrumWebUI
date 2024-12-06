import { act, ChangeEvent, useEffect, useMemo, useState } from "react"
import { StandardStatus } from '../../../../data/State';
import { Team } from "../../../../../../data/CommonDataIndex";
import { Button, Color, SelectItem, SimpleButton, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleSwitch, SimpleTextInput } from "../../../../../../components/ComponentsIndex";
import { BacklogService, PermissionService, ValidationService } from '../../../../../../services/CommonServicesIndex';
import { EnumService } from '../../../../../../services/enum/StateEnumService';
import { UserEditableSettings, UserCheckboxSetting } from '../../../../../account-settings/components/UserEditableSettings';
import { GenericEnumService } from "../../../../../../services/enum/GenericEnumService";
import { AccountService } from "../../../../../account-settings/service/AccountService";
import { BgColor, FontColor, Fonts } from "../../../../../../utils/UtilsIndex";
import { create } from "domain";
import { Project } from "../../../../data/DataIndex";
import { useAlert } from "../../../../../../hooks/HooksIndex";
import { AlertType } from "../../../../../alerting/components/Alert";

interface Props {
    guid?: String
}

export default function ProjectEdit({guid}: Props) {
    const showAlert = useAlert()
    const [isProjectOwner, setIsProjectOwner] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [state, setState] = useState<StandardStatus>(StandardStatus.New)
    const [active, setActive] = useState<boolean>(true)
    const [team, setTeam] = useState<Team>(Team.default())
    const [teams, setTeams] = useState<Team[]>([])

    const fetchData = async () => {
        if(guid != undefined) {
            const project = await BacklogService.getProject(guid)
            setName(project.name)
            setState(project.state)

            if(project.description != undefined)
                setDescription(project.description)

            const currentTeam = teams.filter(team => team.guid == project.teamGuid)
            if(currentTeam.length == 1)
                setTeam(currentTeam[0])
        }
    }

    const checkProjectOwner = async () => {
        const isPo = await PermissionService.isProjectOwner();
        setIsProjectOwner(isPo)
    }



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

        fetchData()
        checkProjectOwner()
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
        <section className="bg-dark p-0 s-settings-section">
            <SimpleTextInput 
                value={name}
                label="Name"
                changeValue={(e) => {setName(e.target.value)}}
                color={BgColor.Transparent}
                fontcolor={FontColor.Dark}
                icon="bi-alphabet"/> 
            <div className="mt-2"></div>
            <SimpleSelectionInput 
                label="State"
                icon="bi-check-all"
                selectedValue={EnumService.convertStandardStatusToString(state)}
                onSelectedValueChange={e => {setNewState(e)}}
                options={stateOptions} /> 
            <div className="mt-2"></div>
            <SimpleSelectionInput 
                label="Team"
                icon="bi-people-fill"
                selectedValue={team.guid}
                onSelectedValueChange={e => {setNewTeam(e)}}
                options={teamOptions} /> 
            <div className="mt-2"></div>
            <SimpleSwitch 
                icon="bi-check2"    
                label="Active project"
                disabled={isProjectOwner == false}
                isChecked={active}
                onValueChange={e => {setActive(e.target.checked)}} />

            <div className="mt-1 mb-1"></div>
            <SimpleMultiLineTextInput
                label="Description"
                icon="bi-card-text"
                value={description} 
                onChange={(e) => {setDescription(e.target.value)}} />
         

        <div className="mt-4 d-flex  justify-content-between">
                <SimpleButton 
                    type={Button.Danger}
                    title={guid == undefined ? "Abort" : "Delete"} 
                    fontColor={Color.Light}
                    font={Fonts.H5}
                    onClick={() => {showAlert(AlertType.Warning, "Not implemented yet")}} /> 


                <SimpleButton 
                    type={Button.Success}
                    title={guid == undefined ? "Save" : "Update"} 
                    fontColor={Color.Light}
                    font={Fonts.H5}
                    onClick={() => {createProject()}} />
        </div>
        </section>
    )
}
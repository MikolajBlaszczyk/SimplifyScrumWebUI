import { ChangeEvent, useEffect, useState } from "react"
import { StandardStatus } from "../../data/State"
import { Team } from "../../../../data/DataIndex";
import { SelectItem, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex";
import { BacklogService } from '../../../../services/BacklogService';
import { EnumService } from '../../../../services/enum/StateEnumService';



export default function ProjectForm() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [state, setState] = useState<StandardStatus>(StandardStatus.Done)
    const [team, setTeam] = useState<Team>(Team.default())

    let stateOptions: SelectItem<string>[] = []
    let teamOptions: SelectItem<Team>[] = []

    const setNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const setNewDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const setNewState = (stateAsString: string) => {
        setState(EnumService.convertStringToStandardStatus(stateAsString))
    } 
    const setNewTeam = (guid: string) => {
        const selectedTeam = teamOptions 
            .map(item => item.value)
            .find(team => team.guid == guid)!

        setTeam(selectedTeam)
    }
    useEffect(() => {
        stateOptions = BacklogService
            .getStandardState()
            .map( state => {
                const item: SelectItem<string> = {
                    value: EnumService.convertStandardStatusToString(state as StandardStatus),
                    description: EnumService.convertStandardStatusToString(state as StandardStatus)
                }
                return item
            })
        
        teamOptions = BacklogService
            .getTeams()
            .map(team => {
                const item: SelectItem<Team> = {
                    value: team,
                    description: team.name
                }
                return item
            })
    }, [])

    return (
        <form  onSubmit={e => e.preventDefault()}>
            <SimpleTextInput
                value={name} 
                changeValue={setNewName}/>
            <SimpleMultiLineTextInput
                value={description} 
                onChange={setNewDescription} />
            <SimpleSelectionInput 
                selectedValue={EnumService.convertStandardStatusToString(state)}
                onSelectedValueChange={setNewState}
                options={stateOptions} /> 
            <SimpleSelectionInput 
                selectedValue={team}
                onSelectedValueChange={setNewTeam}
                options={teamOptions} /> 
        </form>
    )
}
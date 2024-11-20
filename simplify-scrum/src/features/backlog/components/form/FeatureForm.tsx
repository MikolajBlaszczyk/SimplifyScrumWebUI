import { useEffect, useState } from "react"
import { Project,ExtendedStatus } from "../../data/DataIndex"
import { SelectItem, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { EnumService } from "../../../../services/enum/StateEnumService"
import { BacklogService } from "../../../../services/CommonServicesIndex"

export default function FeatureForm() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [state, setState] = useState<ExtendedStatus>(ExtendedStatus.New)
    const [points, setPoints] = useState<number>(0)
    const [project, setProject] = useState<Project>(Project.default())
   
    let stateOptions: SelectItem[] = []
    let pointOptions: SelectItem[] = []
    let projectOptions: SelectItem[] = []

    const setNewState = (stateAsString: string) => {
        setState(EnumService.convertStringToExtendedStatus(stateAsString))
    }
    const setNewPoints = (numberAsString: string) => {
        setPoints(parseInt(numberAsString))
    }

    useEffect(() => {
        stateOptions = BacklogService
            .getExtendedState()
            .map( state => {
                const item: SelectItem = {
                    value: EnumService.convertExtendedStatusToString(state as ExtendedStatus),
                    description: EnumService.convertExtendedStatusToString(state as ExtendedStatus)
                }
                return item
            })
        pointOptions = [
            {value: '0', description: '0'},
            {value: '1', description: '1'},
            {value: '2', description: '2'},
            {value: '3', description: '3'},
            {value: '5', description: '5'},
            {value: '8', description: '8'}
        ]
        BacklogService
            .getProjects()
            .then(projects =>{
                projectOptions = projects.map(project => {
                    const item: SelectItem = {
                        value: project.guid,
                        description: project.name
                    }
    
                    return item
                })
            })
    }, [])
    // fields.push(<SimpleSelectionInput />) // points
    // fields.push(<SimpleSelectionInput />) // project

    return (
        <form onSubmit={e => e.preventDefault()}>
            <SimpleTextInput
                value={title} 
                changeValue={e => setTitle(e.target.value)} />
            <SimpleMultiLineTextInput
                label=""
                
                value={description} 
                onChange={e => setDescription(e.target.value)} />
            <SimpleSelectionInput
                selectedValue={EnumService.convertExtendedStatusToString(state)}
                onSelectedValueChange={setNewState}
                options={stateOptions} />
            <SimpleSelectionInput 
                selectedValue={points.toString()} 
                onSelectedValueChange={setNewPoints}
                options={pointOptions} />
            
        </form>
    )
}
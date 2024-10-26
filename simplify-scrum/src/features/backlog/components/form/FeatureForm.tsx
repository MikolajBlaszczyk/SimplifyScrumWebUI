import { useEffect, useState } from "react"
import { Project,ExtendedStatus } from "../../data/DataIndex"
import { SelectItem, SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { StateEnumService } from "../../service/StateEnumService"
import { BacklogService } from "../../service/BacklogService"

export default function FeatureForm() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [state, setState] = useState<ExtendedStatus>(ExtendedStatus.New)
    const [points, setPoints] = useState<number>(0)
    const [project, setProject] = useState<Project>(Project.default())
   
    let stateOptions: SelectItem<string>[] = []
    let pointOptions: SelectItem<string>[] = []
    let projectOptions: SelectItem<Project>[] = []

    const setNewState = (stateAsString: string) => {
        setState(StateEnumService.convertStringToExtendedStatus(stateAsString))
    }
    const setNewPoints = (numberAsString: string) => {
        setPoints(parseInt(numberAsString))
    }
    const setNewProject = (guid: string) => {
        const selectedProject =projectOptions
            .map(item => item.value)
            .find(project => project.guid == guid)!

        setProject(selectedProject)
    }


    useEffect(() => {
        stateOptions = BacklogService
            .getExtendedState()
            .map( state => {
                const item: SelectItem<string> = {
                    value: StateEnumService.convertExtendedStatusToString(state as ExtendedStatus),
                    description: StateEnumService.convertExtendedStatusToString(state as ExtendedStatus)
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
        projectOptions = BacklogService
            .getProjects()
            .map(project => {
                const item: SelectItem<Project> = {
                    value: project,
                    description: project.name
                }

                return item
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
                value={description} 
                onChange={e => setDescription(e.target.value)} />
            <SimpleSelectionInput
                selectedValue={StateEnumService.convertExtendedStatusToString(state)}
                onSelectedValueChange={setNewState}
                options={stateOptions} />
            <SimpleSelectionInput 
                selectedValue={points.toString()} 
                onSelectedValueChange={setNewPoints}
                options={pointOptions} />
            <SimpleSelectionInput 
                selectedValue={project} 
                onSelectedValueChange={setNewProject}
                options={projectOptions} />
        </form>
    )
}
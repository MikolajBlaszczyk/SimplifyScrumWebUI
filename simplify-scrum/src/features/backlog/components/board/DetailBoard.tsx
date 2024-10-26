import { SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { Feature } from "../../data/Feature"
import FeatureForm from "../form/FeatureForm"
import ProjectForm from "../form/ProjectForm"
import TaskForm from "../form/TaskForm"

export enum DetailType {
    Project,
    Feature, 
    Task
}

interface Prop {
    type: DetailType
}

export function DetailBoard({type}: Prop){
    let form: React.ReactElement = (<div></div>)
 
    if(type == DetailType.Project) {
        form = <ProjectForm />
    } else if (type == DetailType.Feature) {
        form = <FeatureForm />
    } else if (type == DetailType.Task) {
        form = <TaskForm /> 
    }
    
    return(form)
}
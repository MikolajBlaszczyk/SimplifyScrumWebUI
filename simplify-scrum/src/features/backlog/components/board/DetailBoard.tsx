import { SimpleMultiLineTextInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"

export enum DetailType {
    Project,
    Feature, 
    Task
}

interface Prop {
    type: DetailType
}

export function DetailBoard({type}: Prop){
    const fields: React.ReactElement[] = []
    //it needs to be moved to other componnets
    if(type == DetailType.Project) {
        fields.push(<SimpleTextInput label="" value={} changeValue={() => {}}/>) // name
        fields.push(<SimpleMultiLineTextInput />) // description
        fields.push(<SimpleSelectionInput />) // state
        fields.push(<SimpleSelectionInput />) // team
    } else if (type == DetailType.Feature) {
        fields.push(<SimpleTextInput />) // title
        fields.push(<SimpleMultiLineTextInput />) //description
        fields.push(<SimpleSelectionInput />) // state
        fields.push(<SimpleSelectionInput />) // points
        fields.push(<SimpleSelectionInput />) // project
    } else if (type == DetailType.Task) {
   
    }
    return(
    <form onSubmit={e => e.preventDefault()}>

    </form>)
}
import { Button} from "../../../../components/ComponentsIndex"
import { Feature } from "../../data/Feature"
import ProjectEdit from "../Items/Project/Edit/ProjectEdit"
import { ProjectMeta } from "../Items/Project/Edit/ProjectMeta"
import { MouseEvent } from "react"
import { useBacklog } from "../../../../hooks/useContexts"
import { BacklogAction } from "../../../../context/BacklogContext"
import { Fonts } from "../../../../utils/UtilsIndex"
import FeatureEdit from "../Items/Feature/Edit/FeatureEdit"
import { FeatureMeta } from "../Items/Feature/Edit/FeatureMeta"

export enum DetailType {
    Project,
    Feature, 
    Task
}

interface Prop {
    type: DetailType
    title: string
    guid?: string
    parentGuid?: string
}

export function DetailBoard({title, type, guid, parentGuid}: Prop){
    const {state, setState} = useBacklog()

    let form: React.ReactElement = (<div></div>)
    let meta: React.ReactElement = (<div></div>)
    let close: () => void

    if(type == DetailType.Project) {
        form = <ProjectEdit guid={guid}/>
        meta = <ProjectMeta guid={guid} />
        close = () => {
            setState({...state, action: BacklogAction.ShowProjects, guid: "", parentGuid: ""})
        }
    } else if (type == DetailType.Feature) {
        form = <FeatureEdit projectGuid={parentGuid!} guid={guid}/>
        meta = <FeatureMeta guid={guid} />
        close = () => {
            setState({...state, action: BacklogAction.ShowFeatures, guid: "", parentGuid: state.parentGuid})
        }
    }
    
    return(
        <div className="container-fluid h-auto flex-column align-items-center bg-dark mt-5 mb-5 shadow border border-2 rounded s-board p-5  d-flex  position-relative">
            <div className="position-absolute top-0 end-0 p-2">
                {/* <SimpleButton 
                    type={Button.Borderless} 
                    title={""}
                    font={Fonts.H4}
                    fontColor={Color.Light}
                    icon="bi-x-lg"
                    onClick={() => {close()}} /> */}
            </div>

            <div className="d-flex justify-content-center w-100 user-select-none mb-5 pb-2 border-bottom">
                <h3>
                    {title}
                </h3>
            </div>
            
            <div className="row d-flex  w-100">
                <div className="col-8  d-flex ">
                    {form}
                </div>
                <div className="col-4  border p-2 shadow   d-flex ">
                    {meta}
                </div>
            </div>
        </div>    
    )
}
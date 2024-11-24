import { Button, Color, SimpleButton } from "../../../../../../components/ComponentsIndex";
import { BacklogAction } from "../../../../../../context/ContextsIndex";
import { useBacklog } from "../../../../../../hooks/useContexts";
import { Fonts } from "../../../../../../utils/UtilsIndex";


export function ProjectPlaceholder() {
    const {state, setState} = useBacklog()

    const addNewProject = async () => {
        setState({...state, action: BacklogAction.AddProject})
    }

    return(
        <div className="s-border-placeholder rounded border-2 bg-dark-subtle shadow bg-dark s-card-placeholder">
            <SimpleButton 
                type={Button.Borderless} 
                title={"Add"}
                font={Fonts.H3} 
                fontColor={Color.Light}
                onClick={() => addNewProject()} />
        </div>
    )
}
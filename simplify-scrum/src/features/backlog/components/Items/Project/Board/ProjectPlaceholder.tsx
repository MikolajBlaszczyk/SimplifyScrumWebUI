import { MouseEvent } from "react";
import { Button} from "../../../../../../components/ComponentsIndex";
import { BacklogAction } from "../../../../../../context/ContextsIndex";
import { useBacklog } from "../../../../../../hooks/useContexts";
import { Fonts } from "../../../../../../utils/UtilsIndex";
import { Role, Size, Style } from "../../../../../../components/common/button/ButtonProps";


export function ProjectPlaceholder() {
    const {state, setState} = useBacklog()

    const addNewProject = async () => {
        setState({...state, action: BacklogAction.AddProject})
    }

    return(
        <div className="s-border-placeholder border  border-2 rounded   s-card-placeholder">
            <Button 
                style={Style.Borderless}
                role={Role.Primary}
                size={Size.Large}
                title="Add"
                onClick={() => addNewProject()} />
        </div>
    )
}
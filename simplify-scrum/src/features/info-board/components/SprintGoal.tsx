import { Placeholder } from "../../../components/ComponentsIndex"
import { Sprint } from "../../../data/CommonDataIndex"

interface Props {
    isPlaceholder: boolean
    isEmpty: boolean
    sprint: Sprint
}

export function SprintGoal({isPlaceholder, isEmpty, sprint}: Props){
    if(isPlaceholder){
        return (
            <div className="s-bg-daily shadow  s-info-goal-sprint justify-content-center align-items-center d-flex opacity-50">
                <Placeholder />
            </div>
        )
    }

    return(
        <div className="s-bg-daily shadow  s-info-goal-sprint ">
            <h4>
                {
                    isEmpty == false ? 
                    `Goal of the sprint is - ${sprint?.goal}`
                    :
                    "You are not in any Sprint."
                }
            </h4>
        </div>
    )
}
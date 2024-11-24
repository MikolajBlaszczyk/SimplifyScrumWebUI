import { Placeholder } from "../../../components/ComponentsIndex"
import { Sprint } from "../../../data/CommonDataIndex"

interface Props {
    isPlaceholder: boolean
    isEmpty: boolean
    sprint: Sprint
}

export function SprintGoal({isPlaceholder, isEmpty, sprint}: Props){
    if(isPlaceholder == true){
        return (
            <div className="s-bg-daily shadow  s-info-goal-sprint justify-content-center align-items-center d-flex opacity-50">
                <Placeholder />
            </div>
        )
    }

    return(
        <div className={`${isEmpty == true && ' justify-content-center align-items-center d-flex justify '} s-bg-daily shadow  s-info-goal-sprint `}>
            <h4 className={isEmpty == true ? 'text-center s-h3' : ''}>
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
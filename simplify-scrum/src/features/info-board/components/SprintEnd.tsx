import { Placeholder } from "../../../components/ComponentsIndex"
import { Sprint } from "../../../data/CommonDataIndex"

interface Props {
    isPlaceholder: boolean
    isEmpty: boolean
    sprint: Sprint
}

export function SprintEnd({isPlaceholder, isEmpty, sprint}: Props){
    if(isPlaceholder == true){
        return(
        <div className="s-bg-critical shadow s-info-end-sprint d-flex  justify-content-center align-items-center opacity-50">
            <Placeholder />
        </div>
        )
    }
    
    const sprintEnd = ()=>{
        const today = new Date()
        if(sprint.end.getMonth() == today.getMonth()) {
            return sprint.end.getDate() - today.getDate()
        }
        else  {
            const lastMonthDays = new Date(sprint.end.getFullYear(), sprint.end.getMonth(), 0).getDate() - today.getDate()
            return sprint.end.getDate() - lastMonthDays
        }
    } 


    return(
        
        <div className={`${isEmpty == true && ' justify-content-center align-items-center d-flex justify '} s-bg-critical shadow  s-info-end-sprint`}>
            <h4 className={isEmpty == true ? 'text-center s-h3' : ''}>
                {
                    isEmpty == false ? 
                    `Sprint ends in ${sprintEnd()}`
                    :
                    ("You are not in any sprint.")
                }
            </h4>
        </div>
    )
}
import { useEffect, useState } from "react"
import { Card, CardColor, Placeholder } from "../../../components/ComponentsIndex"
import { Sprint } from "../../../data/CommonDataIndex"

interface Props {
    isPlaceholder: boolean
    isEmpty: boolean
    sprint: Sprint
}

export function SprintEnd({isPlaceholder, isEmpty, sprint}: Props){
    const [sprintEnd, setSprintEnd] = useState<number>(0)  
    const sprintEndsIn = ()=>{
        const today = new Date();
        const sprintEndDate = new Date(sprint.end);
        const timeDifference = sprintEndDate.getTime() - today.getTime();
        const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return dayDifference;
    } 

    useEffect(() => {
        if(sprint == null || sprint.end == null || sprint.end == undefined) 
            return
        setSprintEnd(sprintEndsIn())
    }, [sprint])


    return(
        <Card 
            icon="bi-alarm"
            title={"Sprint end"}
            color={CardColor.Accent}
            placeholder={isPlaceholder} 
            content={<h6 style={{width: '70%'}} className="mt-2 rounded justify-content-center d-flex align-items-start pt-4 pb-4">{`${sprintEnd} days left`}</h6>}/>
    )
}
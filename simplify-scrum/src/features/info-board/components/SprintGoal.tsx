import { Card, CardColor, Placeholder } from "../../../components/ComponentsIndex"
import { Sprint } from "../../../data/CommonDataIndex"

interface Props {
    isPlaceholder: boolean
    isEmpty: boolean
    sprint: Sprint
}

export function SprintGoal({isPlaceholder, isEmpty, sprint}: Props){

    return(
            <Card 
                placeholder={isPlaceholder}
                icon="bi-bullseye"
                title={"Goal"}
                color={CardColor.Secondary}
                content={<div style={{width: '70%'}} className="mt-2  rounded h-auto d-flex justify-content-center align-items-start pt-4 pb-4 "><h6>{sprint?.goal}</h6></div>}/>
    )
}
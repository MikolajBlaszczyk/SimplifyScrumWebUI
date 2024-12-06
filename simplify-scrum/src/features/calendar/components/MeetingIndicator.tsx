import { MeetingType, Meeting } from "../../../data/CommonDataIndex";
import '../../../assets/styles/StyleIndex.scss'


interface MeetingIndicatorProps {
    meetings: Meeting[] 
}


const MeetingColor = {
    [MeetingType.daily]: "bg-primary",
    [MeetingType.refinement]: "bg-light",
    [MeetingType.retrospective]: "bg-success",
    [MeetingType.planning]: "bg-info",
    [MeetingType.custom]: "bg-secondary",
    default: ""
}

export default function MeetingIndicator(props: MeetingIndicatorProps){
    
    return(
    
        <div className="d-flex w-100 justify-content-center align-items-center mb-2 fs-12">
            {
                props.meetings?.map(m => {
                    const indication = MeetingColor[m.type] || MeetingColor.default

                    return <span className={`s-dot ${indication} ms-1 me-1`}></span>
                })
            }
        </div>
    )
}
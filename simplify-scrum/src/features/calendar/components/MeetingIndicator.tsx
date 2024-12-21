import { MeetingType, Meeting } from "../../../data/CommonDataIndex";
import { useTooltip } from "../../../hooks/HooksIndex";


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

export default function MeetingIndicator({meetings}: MeetingIndicatorProps){
    return(
        meetings == null || meetings.length == 0 ? 
        <div className=" d-none"></div>
        :
        <div className="d-flex position-absolute bottom-0 start-50 pb-2 translate-middle-x w-100 justify-content-center align-items-center  fs-12">
            {
                meetings?.slice(0,3).map(m => {
                    const indication = MeetingColor[m.type] || MeetingColor.default

                    return <span className={`s-dot ${indication} ms-1 me-1`}></span>
                })
            }
        </div>
    )
}
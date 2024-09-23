import React from "react";
import { MeetingModel } from "../../Models/Scheduling/MeetingModel";
import { MeetingType } from "../../Models/Scheduling/MeetingType";
import '../../Styles/Custom.scss'


interface MeetingIndicatorProps {
    meetings: MeetingModel[] 
}

const MeetingColor = {
    [MeetingType.daily]: () => {
        return "badge rounded-pill text-bg-primary"
    },
    [MeetingType.refinement]: () => {
        return "badge rounded-pill text-bg-light"
    },
    [MeetingType.retrospective]: () => {
        return "badge rounded-pill text-bg-success"
    },
    [MeetingType.planning]: () => {
        return "badge rounded-pill text-bg-info"
    },
    [MeetingType.custom]: () => {
        return "badge rounded-pill text-bg-secondary"
    },
    default: () => {
        return ""
    }
}

export default function MeetingIndicator(props: MeetingIndicatorProps){
    
    return(
        <div className="d-flex flex-column fs-12">
            {
                props.meetings?.map(m => {
                    const indication = MeetingColor[m.type]() || MeetingColor.default()

                    return <span className={indication}>{m.name}</span>
                })
            }
        </div>
    )
}
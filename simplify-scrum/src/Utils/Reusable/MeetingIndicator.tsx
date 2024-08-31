import React from "react";
import {MeetingApi, MeetingType} from "../Models/Scheduling"
import '../Styles/CustomColors.scss'


interface MeetingIndicatorProps {
    meetings: MeetingApi[] 
}

const MeetingColor = {
    [MeetingType.daily]: () => {
        return "meeting-indication-daily"
    },
    [MeetingType.refinement]: () => {
        return "meeting-indication-refinement"
    },
    [MeetingType.retrospective]: () => {
        return "meeting-indication-retrospective"
    },
    [MeetingType.planning]: () => {
        return "meeting-indication-planning"
    },
    [MeetingType.custom]: () => {
        return "meeting-indication-custom"
    },
    default: () => {
        return ""
    }
}

export default function MeetingIndicator(props: MeetingIndicatorProps){
    
    return(
        <div className="d-flex">
            {
                props.meetings?.map(m => {
                    const indication = MeetingColor[m.type]() || MeetingColor.default()

                    return <rect className={indication}>{m.name}</rect>
                })
            }
        </div>
    )
}
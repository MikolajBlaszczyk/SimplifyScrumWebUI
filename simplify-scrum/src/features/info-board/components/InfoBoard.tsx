import { useEffect, useMemo, useState } from "react"
import { InfoCenterService } from "../services/InfoCenterService"
import { DataLoader, Meeting, Sprint, SprintModel } from "../../../data/CommonDataIndex"
import { BacklogService } from "../../../services/CommonServicesIndex"
import { Placeholder } from "../../../components/ComponentsIndex"
import { SprintEnd } from "./SprintEnd"
import { SprintGoal } from "./SprintGoal"
import { MeetingsBlock } from "./MeetingsBlock"

export function InfoBoard(){ 
    const [meetingsLoader, setMeetingsLoader] = useState<DataLoader>(DataLoader.default())
    const [sprintLoader, setSprintLoader] = useState<DataLoader>(DataLoader.default())

    useEffect(() => {
        InfoCenterService
            .getTodaysMeetings()
            .then(meetings => {
                if(meetings.length == 0)
                    setMeetingsLoader(prev => DataLoader.dataFinishedLoading(prev, meetings, true))
                else
                    setMeetingsLoader(prev => DataLoader.dataFinishedLoading(prev, meetings, false))
            })
        
        BacklogService
            .getSprintInfo()
            .then(sprintInfo => {
                if(sprintInfo == null)
                    setSprintLoader(prev => DataLoader.dataFinishedLoading(prev, sprintInfo, true))
                else 
                    setSprintLoader(prev => DataLoader.dataFinishedLoading(prev, sprintInfo, false))
            })
    }, [])

    return (
    <div className="row">
        <div className="col-8">
            <MeetingsBlock
                isEmpty={meetingsLoader.isEmpty}
                isPlaceholder={meetingsLoader.placeholder}
                meetings={meetingsLoader.data} />
        </div>
        <div className="col-4 flex-column justify-content-between">
            <SprintEnd 
                isPlaceholder={sprintLoader.placeholder}
                isEmpty={sprintLoader.isEmpty}
                sprint={sprintLoader.data} />

            <SprintGoal
                isPlaceholder={sprintLoader.placeholder}
                isEmpty={sprintLoader.isEmpty}
                sprint={sprintLoader.data} />
        </div>
    </div>
    )
}
import { useEffect, useMemo, useState } from "react"
import { InfoCenterService } from "../services/InfoCenterService"
import { DataLoader, Meeting, Sprint, SprintModel } from "../../../data/CommonDataIndex"
import { BacklogService } from "../../../services/CommonServicesIndex"
import { Card, Placeholder } from "../../../components/ComponentsIndex"
import { SprintEnd } from "./SprintEnd"
import { SprintGoal } from "./SprintGoal"
import { MeetingsBlock } from "./MeetingsBlock"

export function InfoBoard(){ 
    const [meetingsLoader, setMeetingsLoader] = useState<DataLoader>(DataLoader.default())
    const [sprintLoader, setSprintLoader] = useState<DataLoader>(DataLoader.default())


    const fetchData = async () => {
        const meetings = await InfoCenterService.getTodaysMeetings()
        if(meetings.length == 0)
            setMeetingsLoader(prev => DataLoader.dataFinishedLoading(prev, meetings, true))
        else
            setMeetingsLoader(prev => DataLoader.dataFinishedLoading(prev, meetings, false))
        

        const sprintInfo = await BacklogService.getSprintInfo()
        if(sprintInfo == null)
            setSprintLoader(prev => DataLoader.dataFinishedLoading(prev, sprintInfo, true))
        else 
            setSprintLoader(prev => DataLoader.dataFinishedLoading(prev, sprintInfo, false))
    }

    useEffect(() => {
       fetchData()

    }, [])

    return (
    <div className="d-flex flex-column h-100 s-info-center overflow-hidden">
        <div className="d-flex w-100 s-info-center-header pt-3 pb-2 justify-content-center border-bottom">
            <h2>Informations</h2>
        </div>
        <div className="d-flex justify-content-evenly pt-5 pb-5 h-100">
            <SprintGoal
                    isPlaceholder={sprintLoader.placeholder}
                    isEmpty={sprintLoader.isEmpty}
                    sprint={sprintLoader.data} />
            <MeetingsBlock
                isEmpty={meetingsLoader.isEmpty}
                isPlaceholder={meetingsLoader.placeholder}
                meetings={meetingsLoader.data} />
            <SprintEnd 
                isPlaceholder={sprintLoader.placeholder}
                isEmpty={sprintLoader.isEmpty}
                sprint={sprintLoader.data} />
        </div>
    </div>
    )
}
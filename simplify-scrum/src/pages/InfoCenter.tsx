import { useEffect, useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { Alignment, ArticleLayout, SideBySideLayout } from "../layouts/LayoutIndex";
import { DayFactory, Month, ScheduleModel } from "../data/CommonDataIndex";
import { MeetingSerivce } from "../services/CommonServicesIndex";
import { useLoading } from "../hooks/HooksIndex";
import { NotificationSheet } from "../features/notifications/NotificationIndex";
import { InfoBoard } from "../features/info-board/InfoBoardIndex";
import { ComponentSize } from "../utils/UtilsIndex";


export function InfoCenter(){
    const today = new Date()
    const {isLoading, setIsLoading} =  useLoading();
    const [schedule, setSchedule] = useState<ScheduleModel>({
        month: (today.getMonth()) as Month,
        days: DayFactory.createDaysForCurrentMonth(today)
    })

    useEffect(() => {
        MeetingSerivce.GetMeetings()
        .then(data => setSchedule(data))
        .catch(error => console.log(error))

        
    }, [isLoading])

    return (
        <ArticleLayout sections={
            [
            <InfoBoard/>,
            <SideBySideLayout 
                rightSide={<SimpleCalendar initialDate={today} schedule={schedule} size={ComponentSize.Fit}/>} 
                leftSide={<NotificationSheet />} 
                alignment={Alignment.SideItemLeft} />
        ]} />
    )
}
import { useEffect, useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { Alignment, ArticleLayout, SideBySideLayout } from "../layouts/LayoutIndex";
import { DayFactory, Month, ScheduleModel } from "../features/calendar/data/ModelsIndex";
import { MeetingSerivce } from "../features/calendar/service/MeetingService";
import { useLoading } from "../hooks/useContexts";
import { NotificationSheet } from "../features/notifications/NotificationIndex";
import { InfoBoard } from "../features/info-board/InfoBoardIndex";


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
                rightSide={<SimpleCalendar initialDate={today} schedule={schedule}/>} 
                leftSide={<NotificationSheet />} 
                alignment={Alignment.SideItemLeft} />
        ]} />
    )
}
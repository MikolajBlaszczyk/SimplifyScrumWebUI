import { useEffect, useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { ArticleLayout } from "../layouts/LayoutIndex";
import { DayFactory, Month, ScheduleModel } from "../features/calendar/data/ModelsIndex";
import { MeetingSerivce } from "../features/calendar/service/MeetingService";
import { useLoading } from "../hooks/SimpleContexts";


export function InfoCenter(){
    const today = new Date()
    const {isLoading} =  useLoading();
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
        <ArticleLayout sections={[<SimpleCalendar date={today} schedule={schedule}/>]} />
    )
}
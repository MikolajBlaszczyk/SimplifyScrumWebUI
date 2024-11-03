import { useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { DayFactory, Month, ScheduleModel } from "../features/calendar/data/ModelsIndex";
import { CentralLayout } from "../layouts/CentralLayout";

export function Meetings(){
    const today = new Date()
    const [schedule, setSchedule] = useState<ScheduleModel>({
        month: (today.getMonth()) as Month,
        days: DayFactory.createDaysForCurrentMonth(today)
    })
    return(
        <CentralLayout 
            centralComponent={
                <SimpleCalendar 
                    initialDate={today}
                    schedule={schedule} 
                    maxWidthInPercent={80}/>
                }/>
    )
}
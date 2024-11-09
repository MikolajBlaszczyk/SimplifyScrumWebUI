import { useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { DayFactory, Month, ScheduleModel } from "../data/CommonDataIndex";
import { CentralLayout } from "../layouts/CentralLayout";
import { ComponentSize } from "../utils/UtilsIndex";

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
                    size={ComponentSize.Medium} />
                }/>
    )
}
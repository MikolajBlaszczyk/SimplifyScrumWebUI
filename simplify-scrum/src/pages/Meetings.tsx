import { useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { DayFactory, Month, ScheduleModel } from "../data/CommonDataIndex";
import { CentralLayout } from "../layouts/CentralLayout";
import { ComponentSize } from "../utils/UtilsIndex";

export function Meetings(){
    const today = new Date()
    
    return(
        <CentralLayout 
            centralComponent={
                <SimpleCalendar  
                    className="w-75 h-50 mt-4 mb-4"
                    initialDate={today}/>
                }/>
    )
}
import { useState } from "react";
import Calendar from "react-calendar";
import "../Styles/SimpleCalendar.scss"
import { ScheduleModel } from "../Models/Scheduling/ScheduleModel";
import { DayModel } from "../Models/DayModel";
import MeetingIndicator from "./MeetingIndicator";

interface SimpleCalendarProps {
    date: Date
    className: string
    schedule: ScheduleModel
    onSimpleDayClick: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void
}


export default function SimpleCalendar(props: SimpleCalendarProps) {
    const {date, className, schedule} = props
    const [value, setValue] = useState<Date>(date)

    const onDayClick = (clickedDate: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        if(clickedDate.getMonth() != date.getMonth()){
            event.stopPropagation()
            return
        }
            
        
        props.onSimpleDayClick(clickedDate, event)
    }


    const renderDescription = (currentDate: Date, month: Number) => {
        if(currentDate.getMonth() != month)
            return (<></>)

        const currentDay = schedule.days.find((value) => value.date.getDate() == currentDate.getDate()) as DayModel

        return (
            <div>
                <MeetingIndicator meetings={currentDay?.meetings}/>
            </div>
        )
    }

    return (
        <Calendar
            onChange={(newValue) => setValue(newValue as Date)} 
            value={value}
            tileContent={(args) => renderDescription(args.date, date.getMonth())}
            onClickDay={onDayClick}
            className={className}
        /> 
    )
}
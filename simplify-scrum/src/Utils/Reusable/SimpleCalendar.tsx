import { useState } from "react";
import Calendar from "react-calendar";
import "../Styles/SimpleCalendar.scss"
import { DayApi, ScheduleApi } from "../Models/Scheduling";
import MeetingIndicator from "./MeetingIndicator";

interface SimpleCalendarProps {
    date: Date
    className: string
    schedule: ScheduleApi
}


export default function SimpleCalendar(props: SimpleCalendarProps) {
    const {date, className, schedule} = props
    const [value, setValue] = useState<Date>(date)

    const onDayClick = (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        //OnClickLogic
    }

    const renderDescription = (currentDate: Date) => {
        const currentDay = schedule.days.find((value) => value.date.getDate() == currentDate.getDate()) as DayApi

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
            tileContent={(args) => renderDescription(args.date)}
            onClickDay={onDayClick}
            className={className}
        /> 
    )
}
import { useState } from "react";
import Calendar from "react-calendar";
import "../../../assets/SimpleCalendar.scss";
import { DayModel, MeetingModel, ScheduleModel } from "../data/ModelsIndex";
import MeetingIndicator from "./MeetingIndicator";
import SimpleModal from "./Modal/SimpleModal";
import SimpleDayInfo from "./Modal/SimpleDayInfo";
import { useLoading } from '../../../hooks/SimpleContexts';

interface SimpleCalendarProps {
    date: Date
    schedule: ScheduleModel
}


export default function SimpleCalendar(props: SimpleCalendarProps) {
    const {date, schedule} = props
    const [value, setValue] = useState<Date>(date)
    const [dayClicked, setDayClicked] = useState(false)
    const [selectedDay, setSelectedDay] = useState<DayModel | null>(null)
    
    const onDayClick = (clickedDate: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        if(clickedDate.getMonth() != date.getMonth()){
            event.stopPropagation()
            return
        }

        const clickedDay = schedule.days.find(day => day.date.getTime() == clickedDate.getTime())!

        setDayClicked(true)
        setSelectedDay(clickedDay)
    }

    const closeDayEdit = () => {
        setDayClicked(false)
    }

    const renderDescription = (currentDate: Date, month: Number) => {
        if(currentDate.getMonth() != month)
            return (<></>)

        const currentDay: DayModel | undefined = schedule.days.find(day => day.date.getTime() === currentDate.getTime()) 

        if(currentDate == null)
            return (<></>)


        return (
            <div>
                <MeetingIndicator meetings={currentDay!.meetings}/>
            </div>
        )
    }

    return (
        <>
            <Calendar
            onChange={(newValue) => setValue(newValue as Date)} 
            value={value}
            tileContent={(args) => renderDescription(args.date, date.getMonth())}
            onClickDay={onDayClick}
            className="justify-content-center align-items-center"/>

            {
                dayClicked &&
                <div>
                    <SimpleModal 
                    body={<SimpleDayInfo meetings={selectedDay!.meetings}/>} 
                    day={selectedDay!} 
                    onClose={closeDayEdit}/>
                    <div className="modal-backdrop fade show"/> 
                </div> 
            }
        </>
    )
}
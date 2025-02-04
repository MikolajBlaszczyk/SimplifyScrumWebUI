import { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import { DayModel, ScheduleModel } from "./../../../data/CommonDataIndex";
import MeetingIndicator from "./MeetingIndicator";
import SimpleModal from "./Modal/SimpleModal";
import DayInfo from "./Modal/SimpleDayInfo";
import { useLoading } from '../../../hooks/HooksIndex';
import { MeetingSerivce } from "../../../services/CommonServicesIndex";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";

interface SimpleCalendarProps {
    initialDate: Date 
    className?: string
}

interface DayClickedEventProps {
    clickedDay: Date
    meetings: DayModel | null
    showModal: boolean
}



export default function SimpleCalendar({initialDate, className}: SimpleCalendarProps) {
    const {shouldReload, setShouldReload} = useLoading()
    const showAlert = useAlert()

    const [calendarDate, setCalendarDate] = useState<Date>(initialDate)
    const [schedule, setSchedule] = useState<ScheduleModel>({ 
        month: initialDate.getMonth(),
         days: [] 
    })
    const [clickProps, setClickProps] = useState<DayClickedEventProps>({
        clickedDay: initialDate ?? new Date(),
        meetings: null,
        showModal: false
    })
    
   

    const dayClickedInfoChanged = async (clickedDate: Date, days: DayModel[] | null = null) => {
        let selectedDay: DayModel;

        if(days != null){
            selectedDay = days.find(day => 
                day.date.getTime() == clickedDate.getTime()
            )! 
            if(selectedDay == null) {
                selectedDay =  (await MeetingSerivce.GetMeetingsByDate(clickedDate))
            }
        } else {
            selectedDay = schedule.days.find(day => 
                day.date.getTime() == clickedDate.getTime()
            )!
        }
       
        setClickProps(prev => ({
                ...prev,
                meetings: selectedDay,
                clickedDay: clickedDate,
                showModal: true
            })
        )
    }

    const fetchSchedule = async (date: Date) => {
        const schedule = await MeetingSerivce.GetScheduleByDate(calendarDate)
        setSchedule(schedule)
    }

    const fetchDayMeetings = async (date: Date) => {
        try {
            const schedule = await MeetingSerivce.GetScheduleByDate(date)
            dayClickedInfoChanged(clickProps.clickedDay, schedule.days)
        } catch {
            showAlert(AlertStyle.Danger, "error")
        }
       
    }


    useEffect(() => {
        fetchSchedule(calendarDate)

        if(clickProps.showModal == true) {
            fetchDayMeetings(clickProps.clickedDay)
        }
    },[shouldReload])

    const onDayClick = async (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        await fetchSchedule(date)
        dayClickedInfoChanged(date)
    }

    const closeDayEdit = () => {
        setClickProps(prev => ({...prev, meetings: null, showModal: false}))
    }

    const renderDescription = (currentDate: Date) => {
        const currentDay: DayModel | undefined = schedule.days.find(day => day.date.getTime() === currentDate.getTime()) 

        if(currentDate == null || !currentDay || !(currentDay!.meetings))
            return (<></>)

        return (
                <MeetingIndicator  meetings={currentDay!.meetings}/>
        )
    }


    return (
        <div className={className}>
            <div className="s-calendar-size overflow-hidden">
                <Calendar
                minDetail="month"
                nextLabel={(<i className="bi bi-box-arrow-in-right s-h4"></i>)}
                prevLabel={(<i className="bi bi-box-arrow-in-left s-h4"></i>)}
                showNeighboringMonth={false}
                onChange={(newValue) =>  setCalendarDate(newValue as Date)} 
                value={calendarDate}
                tileContent={(args) => renderDescription(args.date)}
                onClickDay={onDayClick}
                onActiveStartDateChange={async (date) => {
                    if (date.activeStartDate) {
                        setCalendarDate(date.activeStartDate)
                        let schedule = await MeetingSerivce.GetScheduleByDate(date.activeStartDate)
                        setSchedule(schedule)
                    }
                }}
                className="justify-content-center align-items-center"/>
                
                {
                    clickProps.showModal &&
                    <div>
                        <SimpleModal 
                        body={<DayInfo  clickedDay={clickProps.clickedDay}/>} 
                        day={clickProps.meetings!} 
                        onClose={closeDayEdit}/>
                        <div className="modal-backdrop fade show"/> 
                    </div> 
                }
            </div>
        </div>
       
    )
}
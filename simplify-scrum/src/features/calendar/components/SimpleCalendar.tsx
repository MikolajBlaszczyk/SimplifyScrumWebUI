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
import { componentSize, ComponentSize } from "../../../utils/UtilsIndex";

interface SimpleCalendarProps {
    initialDate: Date 
}

interface DayClickedEventProps {
    date: Date
    selectedDay: DayModel | null
    showModal: boolean
}

export default function SimpleCalendar({initialDate}: SimpleCalendarProps) {
    const {shouldReload} = useLoading()
    const showAlert = useAlert()
    const calendarRef = useRef<HTMLDivElement>(null)

    const [schedule, setSchedule] = useState<ScheduleModel>({ month: initialDate.getMonth(), days: [] })
    const [calendarDate, setCalendarDate] = useState(initialDate)
    const [clickProps, setClickProps] = useState<DayClickedEventProps>({
        date: initialDate ?? new Date(),
        selectedDay: null,
        showModal: false
    })
    
    const dayClickedInfoChanged = (clickedDate: Date, days: DayModel[] | null = null) => {
        let selectedDay: DayModel;

        if(days != null){
            selectedDay = days.find(day => 
                day.date.getTime() == clickedDate.getTime()
            )! 
        } else {
            selectedDay = schedule.days.find(day => 
                day.date.getTime() == clickedDate.getTime()
            )!
        }
       
        setClickProps(prev => ({
                ...prev,
                selectedDay: selectedDay,
                date: clickedDate
            })
        )
    }

    const fetchData = async () => {
        const schedule = await MeetingSerivce.GetMeetings()
        setSchedule(schedule)
    }

    useEffect(() => {
        fetchData()
    },[shouldReload])
    
    useEffect(() => {    
        MeetingSerivce
            .GetMeetings()
            .then(data => dayClickedInfoChanged(clickProps.date, data.days))
            .catch(error => showAlert(AlertStyle.Danger, error.message))
    },[shouldReload])

    const onDayClick = (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        if(date.getMonth() != initialDate.getMonth()){
            event.stopPropagation()
            return
        }
        
        dayClickedInfoChanged(date)
        setClickProps(prev => ({...prev, showModal: true}))

        if (calendarRef.current) {
            calendarRef.current.classList.add('animate-height')
            setTimeout(() => {
                if (calendarRef.current) {
                    calendarRef.current.classList.remove('animate-height')
                }
            }, 1000)
        }
    }

    const closeDayEdit = () => {
        setClickProps(prev => ({...prev, selectedDay: null, showModal: false}))
    }

    const renderDescription = (currentDate: Date, month: Number) => {
        if(currentDate.getMonth() != month)
            return (<></>)

        const currentDay: DayModel | undefined = schedule.days.find(day => day.date.getTime() === currentDate.getTime()) 

        if(currentDate == null)
            return (<></>)

        if(!currentDay)
            return (<></>)

        if(!(currentDay!.meetings))
            return (<></>)

        return (
                <MeetingIndicator meetings={currentDay!.meetings}/>
        )
    }

    return (
        <div className="s-calendar-size overflow-hidden"  ref={calendarRef}>
            <Calendar
            minDetail="month"
            nextLabel={(<h5 className="me-1"><i className="bi bi-box-arrow-in-right"></i></h5>)}
            prevLabel={(<h5 className="ms-1"><i className="bi bi-box-arrow-in-left"></i></h5>)}
            showNeighboringMonth={false}
            onChange={(newValue) => setCalendarDate(newValue as Date)} 
            value={initialDate ?? new Date()}
            tileContent={(args) => renderDescription(args.date, calendarDate.getMonth())}
            onClickDay={onDayClick}
            className="justify-content-center align-items-center"/>
            
            {
                clickProps.showModal &&
                <div>
                    <SimpleModal 
                    body={<DayInfo meetings={clickProps.selectedDay!.meetings} clickedDay={clickProps.date}/>} 
                    day={clickProps.selectedDay!} 
                    onClose={closeDayEdit}/>
                    <div className="modal-backdrop fade show"/> 
                </div> 
            }
        </div>
    )
}
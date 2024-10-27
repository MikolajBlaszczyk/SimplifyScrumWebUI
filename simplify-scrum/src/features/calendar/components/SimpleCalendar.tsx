import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import '../../../assets/styles/StyleIndex.scss'
import { DayModel, Meeting, ScheduleModel } from "../data/ModelsIndex";
import MeetingIndicator from "./MeetingIndicator";
import SimpleModal from "./Modal/SimpleModal";
import SimpleDayInfo from "./Modal/SimpleDayInfo";
import { useLoading } from '../../../hooks/useContexts';
import { MeetingSerivce } from "../service/MeetingService";

interface SimpleCalendarProps {
    initialDate: Date 
    schedule: ScheduleModel
}

interface DayClickedEventProps {
    date: Date
    selectedDay: DayModel | null
    showModal: boolean
}


export default function SimpleCalendar(props: SimpleCalendarProps) {
    const {initialDate, schedule} = props
    const {isLoading} = useLoading()

    const [calendarDate, setCalendarDate] = useState(initialDate)
    const [clickProps, setClickProps] = useState<DayClickedEventProps>({
        date: initialDate ?? new Date(),
        selectedDay: null,
        showModal: false
    })
    
    const dayClickedInfoChanged = (clickedDate: Date, days: DayModel[] | null = null) =>{
        
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
    
    useEffect(() => {        
        MeetingSerivce
            .GetMeetings()
            .then(data => dayClickedInfoChanged(clickProps.date, data.days))

        
    },[isLoading])



    const onDayClick = (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
       
        if(date.getMonth() != initialDate.getMonth()){
            event.stopPropagation()
            return
        }
        
        dayClickedInfoChanged(date)
        setClickProps(prev => ({...prev, showModal: true}))
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


        return (
            <div>
                <MeetingIndicator meetings={currentDay!.meetings}/>
            </div>
        )
    }

    return (
        <>
            <Calendar
            onChange={(newValue) => setCalendarDate(newValue as Date)} 
            value={initialDate ?? new Date()}
            tileContent={(args) => renderDescription(args.date, calendarDate.getMonth())}
            onClickDay={onDayClick}
            className="justify-content-center align-items-center"/>

            {
                clickProps.showModal &&
                <div>
                    <SimpleModal 
                    body={<SimpleDayInfo meetings={clickProps.selectedDay!.meetings} clickedDay={clickProps.date}/>} 
                    day={clickProps.selectedDay!} 
                    onClose={closeDayEdit}/>
                    <div className="modal-backdrop fade show"/> 
                </div> 
            }
        </>
    )
}
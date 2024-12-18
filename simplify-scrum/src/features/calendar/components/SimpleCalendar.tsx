import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { DayModel, ScheduleModel } from "./../../../data/CommonDataIndex";
import MeetingIndicator from "./MeetingIndicator";
import SimpleModal from "./Modal/SimpleModal";
import SimpleDayInfo from "./Modal/SimpleDayInfo";
import { useLoading } from '../../../hooks/HooksIndex';
import { MeetingSerivce } from "../../../services/CommonServicesIndex";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertType } from "../../alerting/components/Alert";
import { componentSize, ComponentSize } from "../../../utils/UtilsIndex";

interface SimpleCalendarProps {
    initialDate: Date 
    schedule: ScheduleModel
    size?: ComponentSize
    maxWidthInPercent?: number
}

interface DayClickedEventProps {
    date: Date
    selectedDay: DayModel | null
    showModal: boolean
}


export default function SimpleCalendar({initialDate, schedule, maxWidthInPercent, size}: SimpleCalendarProps) {
    const {isLoading} = useLoading()
    const  showAlert = useAlert()

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
            .catch(error => showAlert(AlertType.Danger, error.message))
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

        if(!currentDay)
            return (<></>)

        if(!(currentDay!.meetings))
            return (<></>)

        return (
            <div>
                <MeetingIndicator meetings={currentDay!.meetings}/>
            </div>
        )
    }

    const widthPercantage = maxWidthInPercent != undefined ? `${maxWidthInPercent}%` : '100%'

    return (
        <div className={`d-flex ${componentSize[size!] ?? componentSize.default}`} style={{width: widthPercantage }}>
            <Calendar
            minDetail="month"
            nextLabel={(<h5><i className="bi bi-box-arrow-in-right"></i></h5>)}
            prevLabel={(<h5><i className="bi bi-box-arrow-in-left"></i></h5>)}
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
                    body={<SimpleDayInfo meetings={clickProps.selectedDay!.meetings} clickedDay={clickProps.date}/>} 
                    day={clickProps.selectedDay!} 
                    onClose={closeDayEdit}/>
                    <div className="modal-backdrop fade show"/> 
                </div> 
            }
        </div>
    )
}
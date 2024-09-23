import { useContext, useEffect, useState } from "react";
import { Global, UserContext } from "../../Context/UserContext";
import { MockSchedule } from "../../Utils/Mocks/SchedulingMock";
import SimpleModal from "../../Utils/Reusable/SimpleModal";
import "../../Utils/Styles/Modal.scss";
import SimpleCalendar from "../../Utils/Reusable/Calendar/SimpleCalendar";
import SimpleDayInfo from "../../Utils/Reusable/SimpleDayInfo";
import { MeetingModel } from '../../Utils/Models/Scheduling/MeetingModel';
import { DayModel } from "../../Utils/Models/DayModel";

interface SelectedDayState{ 
    showModal: boolean
    selectedDay: DayModel | null
}


export default function MainDashboard(){
    const [dayState, setSelectedDay] = useState<SelectedDayState>(
        {showModal: false, selectedDay: null}
    )
    const {settings, setSettings} = useContext(UserContext) as Global   
    
    const currentDate = new Date()
    const schedule = MockSchedule

    const onModalClose = () => {
        setSelectedDay({
            ...dayState,
            showModal: false
        } as SelectedDayState)

    }

    const onDayClick = (clickedDate: Date) => {
        
        const clickedDay =  schedule.days.find(day => day.date.getDate() == clickedDate.getDate())
        setSelectedDay({
            showModal: true,
            selectedDay: clickedDay,
        } as SelectedDayState)
    }

    useEffect(() => {
        setSettings({...settings, isInStartupScreen: false, })
    }, [])

    return (
        <main className="d-flex w-100 h-100 bg-dark justify-content-center">
           <SimpleCalendar 
                schedule={schedule}
                date={currentDate}
                className={"justify-content-center align-items-center"} 
                onSimpleDayClick={(dayDate, event) => {onDayClick(dayDate)} }/>
            {
                dayState.showModal &&
                <SimpleModal 
                    title={dayState.selectedDay?.date.toDateString() ?? ""} 
                    body={<SimpleDayInfo meetings={dayState.selectedDay?.meetings ?? []} startMeeting={dayState.selectedDay?.meetings[0] ?? {} as MeetingModel}/>} 
                    onSave={() => {}}
                    onClose={() => {onModalClose()}}/>
            }
            {
                dayState.showModal && 
                <div className="modal-backdrop fade show"/> 
            }
        </main>
    )
}
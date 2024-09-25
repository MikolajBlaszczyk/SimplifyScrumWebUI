import { useContext, useEffect, useState } from "react";
import { Global, UserContext } from "../../Context/UserContext";
import SimpleModal from "../../Utils/Reusable/SimpleModal";
import "../../Utils/Styles/Modal.scss";
import SimpleCalendar from "../../Utils/Reusable/Calendar/SimpleCalendar";
import SimpleDayInfo from "../../Utils/Reusable/SimpleDayInfo";
import { MeetingFactory, MeetingModel } from '../../Utils/Models/Scheduling/MeetingModel';
import { DayFactory, DayModel } from "../../Utils/Models/Scheduling/DayModel";
import { ScheduleModel } from "../../Utils/Models/Scheduling/ScheduleModel";
import { Month } from "../../Utils/Models/Scheduling/Month";
import { Api as Api } from "../../Services/ApiService";

interface SelectedDayState{ 
    showModal: boolean
    selectedDay: DayModel 
}


export default function MainDashboard(){
    const currentDate = new Date()
    const [dayState, setSelectedDay] = useState<SelectedDayState>(
        { showModal: false, selectedDay: DayFactory.todayWithNoMeetings() }
    )
    const [schedule, setSchedule] = useState<ScheduleModel>({
        month: (currentDate.getMonth()) as Month,
        days: []
    })
    const {settings, setSettings} = useContext(UserContext) as Global   
    
    const getSchedule = () => {
        const service = Api.Gateway.meetingService
        
        service.GetMeetings()
        .then(data => setSchedule(data))
        .catch(error => console.log(error))
    }
    

    useEffect(() => {
       getSchedule()
    }, [])

    const addMeeting = (meeting: MeetingModel) => {
        const service = Api.Gateway.meetingService

        service.AddMeeting(meeting)

        getSchedule()
    }

    const removeMeeting = (meeting: MeetingModel) => {
        const service = Api.Gateway.meetingService

        service.DeleteMeeting(meeting)

        getSchedule()
    }

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
                    body={
                        <SimpleDayInfo 
                            meetings={dayState.selectedDay?.meetings ?? []} 
                            startMeeting={dayState.selectedDay?.meetings[0] ?? MeetingFactory.default}
                            addMeeting={addMeeting}
                            removeMeeting={removeMeeting}
                            />} 
                    day={dayState.selectedDay}
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
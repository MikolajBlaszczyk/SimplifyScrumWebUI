import { MouseEvent, useEffect, useState } from "react"
import { Meeting } from "../../../../data/CommonDataIndex"
import SimpleMeetingForm from './SimpleMeetingForm';
import { MeetingSerivce } from "../../../../services/CommonServicesIndex";
import { useLoading } from "../../../../hooks/HooksIndex";
import { Button } from "../../../../components/ComponentsIndex";
import { Role, Size, Style } from "../../../../components/common/button/ButtonProps";
import { useAlert } from '../../../../hooks/useAlert';
import { AlertStyle, AlertType } from "../../../alerting/components/Alert";
import { format } from "date-fns";

interface properties {
    clickedDay: Date
}

export default function DayInfo({clickedDay}: properties){
    const showAlert = useAlert()
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
    const {shouldReload: isLoading, setShouldReload: setIsLoading} = useLoading()
    const [meetingsList, setMeetingsList] = useState<JSX.Element[]>([])
    
    const fetchMeetings = async () => {
        const formattedDateTime = formatISOWithTimezone(clickedDay);
        const day = await MeetingSerivce.GetMeetingsByDate(formattedDateTime)
        setMeetingsList(day.meetings.map(meeting => {
            return <li key={meeting.guid}  
            onClick={() => setSelectedMeeting(meeting)} 
            className="d-flex flex-row justify-content-between list-group-item meeting-item">
            {meeting.name}
            <Button 
                className="pe-0"
                size={Size.Medium}
                role={Role.Cancel}
                style={Style.Borderless}
                onClick={(e) => {
                    e.stopPropagation();
                    deleteMeeting(meeting);
                }}
                icon="bi-x-lg"/>
        </li>
        }))
    }

    const formatISOWithTimezone = (date: Date) => {
        const pad = (num: number) => String(num).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const timezoneOffset = -date.getTimezoneOffset();
        const sign = timezoneOffset >= 0 ? '+' : '-';
        const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
        const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
    }

    useEffect(() => {
        fetchMeetings()
     
    }, [isLoading])
    

    const deleteMeeting = async (meeting: Meeting) => {
        const response = await MeetingSerivce.DeleteMeeting(meeting.guid)
       
        if(response === false){
            showAlert(AlertStyle.Danger, "Could not delete meeting.", "Failed to delete meeting", AlertType.Confirm)
        } else {
            if(selectedMeeting?.guid == meeting.guid){
                setSelectedMeeting(null)
            }
            setIsLoading(isLoading + 1)
        }
    }

    return (
        <div className="d-flex flex-column mt-2 mb-2">
            <div className="row">
                <div className="col-6 border-end border-opacity-50">
                    <ul className="list-group p-3">
                        {meetingsList}
                    </ul>
                </div>
                <div className="col-6">
                    <SimpleMeetingForm 
                        meetingGuid={selectedMeeting?.guid} 
                        clickedDay={clickedDay} 
                        onMeetingUpdated={() => {
                            setSelectedMeeting(null); // Clear selection after update
                            setIsLoading(isLoading + 1);
                        }} 
                    />
                </div>
            </div>
        </div>
    )
}
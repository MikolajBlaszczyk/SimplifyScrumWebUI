import { useState } from "react"
import { Meeting } from "../../../../data/CommonDataIndex"
import SimpleMeetingForm from './SimpleMeetingForm';
import { MeetingSerivce } from "../../../../services/CommonServicesIndex";
import { useLoading } from "../../../../hooks/HooksIndex";

interface properties {
    meetings: Meeting[]
    clickedDay: Date
}

export default function DayInfo({meetings, clickedDay}: properties){
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null) 
    const {shouldReload: isLoading, setShouldReload: setIsLoading} = useLoading()

    const deleteMeeting = (meeting: Meeting) => {

        MeetingSerivce
            .DeleteMeeting(meeting.guid)
            .then(data => {
                setIsLoading(isLoading + 1)
                setSelectedMeeting(meetings.at(0) ?? null)
            })
    }
    
    return (
    <div className="container">
        <div className="row">
            <div className="col-6 border-secondary border-end border-opacity-50">
                <ul className="list-group">
                    { 
                        meetings?.map(meeting => {
                            return (
                            <li onClick={() => setSelectedMeeting(meeting)} className=" d-flex flex-row justify-content-between list-group-item list-group-item-info">
                                {meeting.name}
                                <button className="btn btn-danger" onClick={e => deleteMeeting(meeting)}>X</button>
                            </li>)
                        })
                    }
                </ul>
            </div>
            <div className="col-6">
                    <SimpleMeetingForm meetingGuid={selectedMeeting?.guid} clickedDay={clickedDay}/>
            </div>
        </div>
    </div>
    )
}
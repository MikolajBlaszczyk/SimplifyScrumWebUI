import { useState } from "react"
import { Meeting } from "../../data/ModelsIndex"
import SimpleMeetingForm from './SimpleMeetingForm';
import { MeetingSerivce } from "../../service/MeetingService";
import { useLoading } from "../../../../hooks/SimpleContexts";

interface properties {
    meetings: Meeting[]
    clickedDay: Date
}

export default function SimpleDayInfo(props: properties){
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null) 
    const {isLoading, setIsLoading} = useLoading()

    const deleteMeeting = (meeting: Meeting) => {
        MeetingSerivce
            .DeleteMeeting(meeting)
            .then(data => {
                setIsLoading(isLoading + 1)
                setSelectedMeeting(props.meetings.at(0) ?? null)
            })
    }
    
    return (
    <div className="container">
        <div className="row">
            <div className="col border-secondary border-end border-opacity-50">
                <ul className="list-group">
                    { 
                        props.meetings?.map(meeting => {
                            return (
                            <li onClick={() => setSelectedMeeting(meeting)} className=" d-flex flex-row justify-content-between list-group-item list-group-item-info">
                                {meeting.name}
                                <button className="btn btn-danger" onClick={e => deleteMeeting(meeting)}>X</button>
                            </li>)
                        })
                    }
                </ul>
            </div>
            <div className="col">
                    <SimpleMeetingForm initialMeeting={selectedMeeting} clickedDay={props.clickedDay}/>
            </div>
        </div>
    </div>
    )
}
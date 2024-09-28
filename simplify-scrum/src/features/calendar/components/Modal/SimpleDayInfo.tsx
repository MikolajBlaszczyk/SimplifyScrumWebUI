import { useState } from "react"
import { MeetingFactory, MeetingModel } from "../../data/ModelsIndex"
import SimpleMeetingForm from './SimpleMeetingForm';

interface properties {
    meetings: MeetingModel[]
}

export default function SimpleDayInfo(props: properties){
    const {meetings} = props
    const startMeeting = meetings.at(0) ?? null
    const [selectedMeeting, setSelectedMeeting] = useState(startMeeting)

    return (
    <div className="container">
        <div className="row">
            <div className="col border-secondary border-end border-opacity-50">
                <ul className="list-group">
                    { 
                        meetings.map(meeting => {
                            return (
                            <li onClick={() => setSelectedMeeting(meeting)} className="list-group-item list-group-item-info">{meeting.name}</li>)
                        })
                    }
                </ul>
            </div>
            <div className="col">
                    <SimpleMeetingForm initialMeeting={selectedMeeting}/>
            </div>
        </div>
    </div>
    )
}
import { useState } from "react"
import { MeetingModel } from "../Models/Scheduling/MeetingModel"
import SimpleMeetingForm from './SimpleMeetingForm';
import { MockSchedule } from "../Mocks/SchedulingMock"

interface properties {
    meetings: MeetingModel[]
    startMeeting: MeetingModel
}

export default function SimpleDayInfo(props: properties){
    const {startMeeting, meetings} = props

    const [selectedMeeting, setSelectedMeeting] = useState(startMeeting)


    return (
    <div className="container">
        <div className="row">
            <div className="col border-secondary border-end border-opacity-50">
                <ul className="list-group">
                    { 
                        meetings.map(meeting => {
                            return (
                            <li className="list-group-item list-group-item-info">{meeting.name}</li>)
                        })
                    }
                </ul>
            </div>
            <div className="col">
                    <SimpleMeetingForm meeting={startMeeting}/>
                                     
            </div>
        </div>
    </div>
    )
}
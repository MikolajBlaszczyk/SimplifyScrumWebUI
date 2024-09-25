import { useState } from "react"
import { MeetingModel } from "../Models/Scheduling/MeetingModel"
import SimpleMeetingForm from './SimpleMeetingForm';

interface properties {
    meetings: MeetingModel[]
    startMeeting: MeetingModel
    addMeeting: (meeting: MeetingModel) => void
    removeMeeting: (meeting: MeetingModel) => void
}

export default function SimpleDayInfo(props: properties){
    const {startMeeting, meetings, addMeeting, removeMeeting} = props

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
                    <SimpleMeetingForm
                        initialMeeting={selectedMeeting}
                        setInitialMeeting={setSelectedMeeting}
                        add={() => {
                            addMeeting(selectedMeeting)
                        }} 
                        remove={() => {
                            removeMeeting(selectedMeeting)
                        }}
                        />
                                     
            </div>
        </div>
    </div>
    )
}
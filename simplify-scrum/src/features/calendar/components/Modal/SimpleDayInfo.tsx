
import { MouseEvent, useEffect, useState } from "react"
import { Meeting } from "../../../../data/CommonDataIndex"
import SimpleMeetingForm from './SimpleMeetingForm';
import { MeetingSerivce } from "../../../../services/CommonServicesIndex";
import { useLoading } from "../../../../hooks/HooksIndex";
import { Button } from "../../../../components/ComponentsIndex";
import { Role, Size, Style } from "../../../../components/common/button/ButtonProps";
import { useAlert } from '../../../../hooks/useAlert';
import { AlertStyle, AlertType } from "../../../alerting/components/Alert";

interface properties {
    meetings: Meeting[]
    clickedDay: Date
}

export default function DayInfo({meetings, clickedDay}: properties){
    const showAlert = useAlert()
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null) 
    const [list, setList] =useState<React.JSX.Element[]>([])
    const {shouldReload: isLoading, setShouldReload: setIsLoading} = useLoading()
    

    useEffect(() => {
        setList(meetings?.map(meeting => {
            return (
            <li onClick={() => {setSelectedMeeting(meeting)}} className=" d-flex flex-row justify-content-between list-group-item meeting-item">
                {meeting.name}
                <Button 
                    className=" pe-0"
                    size={Size.Medium}
                    role={Role.Cancel}
                    style={Style.Borderless}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteMeeting(meeting);
                    }}
                    icon="bi-x-lg"/>
            </li>)
        })
        )
    }, [meetings])

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
            <div className="col-6  border-end border-opacity-50 ">
                <ul className="list-group p-3">
                    { 
                       list
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
import { useMemo, useState } from "react"
import DatePicker from "react-datepicker";
import { MeetingFactory, MeetingModel } from "../Models/Scheduling/MeetingModel"
import { MeetingType } from '../Models/Scheduling/MeetingType';
import { type } from "@testing-library/user-event/dist/type";

interface properties{
    initialMeeting: MeetingModel
    setInitialMeeting: React.Dispatch<React.SetStateAction<MeetingModel>>
    add: () => void
    remove: () => void
}


export default function SimpleMeetingForm(props: properties){
    const {initialMeeting, setInitialMeeting, add, remove} = props

    const [editedMeeting, setEditedMeeting] = useState<MeetingModel>(
        MeetingFactory.copy(initialMeeting

        ))


    let enumValues = useMemo(() => {
        let values = []
        for(let type in MeetingType){
            if(isNaN(Number(type))){
                values.push(type)
            }
        }
        return values;
    },[])
   

    return (
        <div className="d-flex flex-column">
                <div className="input-group input-group-sm">
                    <label className="input-group-text">Meeting Name</label>
                    <input 
                        type="text"
                        placeholder="Name" 
                        className="form-control"
                        value={editedMeeting.name} 
                        onChange={(e) => setEditedMeeting({...editedMeeting, name: e.target.value})}/>
                </div>
                <div className="input-group input-group-sm mt-2">
                    <label className="input-group-text">Description</label>
                    <input 
                        type="text"
                        placeholder="Description"
                        className="form-control"
                        value={editedMeeting.description}
                        onChange={(e) => setEditedMeeting({...editedMeeting, description: e.target.value})}/>
                </div>
                <div className="input-group input-group-sm mt-2">
                    <label className="input-group-text">Leaders</label>
                    <select className=" form-select">
                        <option>Leader 1</option>
                        <option>Leader 2</option>
                        <option>Leader 3</option>
                        <option>Leader 4</option>
                    </select>
                </div>
                <div className="input-group input-group-sm mt-2">
                    <label className="input-group-text">Date</label>
                    <input className=" form-control" type="datetime-local"/>
                </div>
                <div className="input-group input-group-sm mt-2">
                    <label className="input-group-text">Type</label>
                    <select className=" form-select">
                        {
                           enumValues.map(value => (<option>{value}</option>))
                        }
                    </select>
                </div>
                <div className="mt-2">
                    <label className="form-label">Duration in minutes</label>
                    <input type="range" className=" form-range" min={0} max={60}/>
                </div>

                {/* We should have a picker for type here */}
                <div className="mt-2 d-flex justify-content-end">
                        <button 
                            onClick={remove} 
                            className="btn me-2">Remove</button>
                        <button 
                            onClick={() => {
                                setInitialMeeting(editedMeeting)
                                add()
                            }} 
                            className="btn">Add</button>
                </div>
                
        </div>
    )
}
import { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import { MeetingFactory, MeetingModel, MeetingType } from "../../data/ModelsIndex"
import { MeetingSerivce } from "../../service/MeetingService"
import { useLoading } from "../../../../hooks/SimpleContexts"
import { UserService } from "../../../account-settings/service/UserService"
import { SimpleUserModel } from "../../../authorization/data/User"

interface properties{
    initialMeeting: MeetingModel | null
}


export default function SimpleMeetingForm(props: properties){
    const {initialMeeting} = props
    const {setIsLoading} = useLoading()
    const [isNew, setIsNew] = useState(initialMeeting == null)
    const [leaders, setLeaders] = useState<SimpleUserModel[]>([])
    const [editedMeeting, setEditedMeeting] = useState<MeetingModel>(
        MeetingFactory.copy(initialMeeting ?? MeetingFactory.default)
    )

    const getAllUsers = async () => {
        await UserService.getUsers()
        .then(data => {
            setLeaders(data)
        })
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const addMeeting = () => { 
        UserService.getInfo()
            .then(data => {
                setEditedMeeting({...editedMeeting, userIdentifiers: [...editedMeeting.userIdentifiers, data.id ]})
        
                if(isNew) {
                    MeetingSerivce.Add(editedMeeting)
                    setIsLoading(true)
                    return
                }
        
                MeetingSerivce.UpdateMeeting(editedMeeting)
                setIsLoading(true)
            })
    }

    const removeMeeting = () => {
        MeetingSerivce.DeleteMeeting(editedMeeting)

        setIsLoading(true)
    }

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEditedMeeting({...editedMeeting, leaderId: event.target.value})
    }
    
    const enumValues = useMemo(() => {
        
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
                    <select className=" form-select" value={(editedMeeting.leaderId)} onChange={onSelectChange}>
                        {
                            leaders.map(leader => (<option value={leader.id}>{leader.nickname}</option>))
                        }
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
                            onClick={removeMeeting} 
                            className="btn me-2">Remove</button>
                        <button 
                            onClick={addMeeting} 
                            className="btn">Add</button>
                </div>
                
        </div>
    )
}
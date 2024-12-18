import { useEffect, useState } from "react"
import { MeetingFactory, Meeting, MeetingType, User } from "../../../../data/CommonDataIndex"
import { MeetingEnumService, MeetingSerivce } from "../../../../services/CommonServicesIndex"
import { useLoading } from "../../../../hooks/HooksIndex"
import { AccountService } from "../../../account-settings/service/AccountService"
import { SelectItem, SimpleDateInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { SimpleDurationInput } from "../../../../components/form/SimpleDurationInput"
import { DateConverter } from '../../../../utils/utility-services/DateSerivces';

interface properties{
    initialMeeting: Meeting | null
    clickedDay: Date
}


export default function SimpleMeetingForm(props: properties){
    const [leadersOptions, setLeadersOptions] = useState<SelectItem[]>([])
    const [selectedLeader, setSelectedLeaeder] = useState<User>(User.default())

    let meetingOptions: SelectItem[] = []

    const {initialMeeting, clickedDay} = props
    const {isLoading, setIsLoading} = useLoading()
    const [isNew, setIsNew] = useState(initialMeeting == null)
   
    const [editedMeeting, setEditedMeeting] = useState<Meeting>(
        MeetingFactory.copy(initialMeeting ?? {...MeetingFactory.default, start: clickedDay})
    )

    useEffect(() => {
       
    }, [])

    const addMeeting = () => { 
        AccountService.getInfo()
            .then(data => {
                const newValue =  {...editedMeeting, userIdentifiers: [...editedMeeting.userIdentifiers, data.id ]}

                if(isNew) {
                    MeetingSerivce
                        .Add(newValue)
                        .then(data => {setIsLoading(isLoading + 1)})
                    return
                }
        
                MeetingSerivce
                    .UpdateMeeting(editedMeeting)
                    .then(data => {
                        setIsLoading(isLoading + 1)
                        setEditedMeeting(editedMeeting)
                    })
                

            })
    }

    const removeMeeting = () => {
        MeetingSerivce
            .DeleteMeeting(editedMeeting)
            .then(data => {setIsLoading(isLoading + 1)})

    }

    //#region inputs
    
    const changeName = (newValue: string) => {
        setEditedMeeting(prev => ({...prev, name: newValue}))
    }

    const changeDescription = (newValue: string) => {
        setEditedMeeting(prev => ({...prev, description: newValue}))
    }

    const onLeaderChange = (newValue: string) => {
        setEditedMeeting(prev => ({...prev, leaderId: newValue}))
    }

    const onMeetingStartChange = (newValue: string) => {
        setEditedMeeting(prev => ({...prev, start: new Date(newValue)}))
    }

    const onMeetingTypeChnage = (newValue: string) => {
        const newType = MeetingType[newValue as keyof typeof MeetingType]
        setEditedMeeting(prev => ({...prev, type: newType}))
    }

    const onDurationChange = (newValue: number) => {
        const newDuration = DateConverter.convertDateToTimeString(new Date(0, 0, 0,0, newValue))
        setEditedMeeting(prev => ({...prev, duration: newDuration }))
    } 

    //#endregion inputs
    
  

    return (
        <div className="d-flex flex-column">
                <SimpleTextInput 
                    label="Name"
                    value={editedMeeting.name}
                    changeValue={(e) => changeName(e.target.value)}/>
                <SimpleTextInput 
                    label="Description"
                    value={editedMeeting.description}
                    changeValue={(e) => changeDescription(e.target.value)}/>

                <SimpleDateInput 
                    value={new Date(editedMeeting.start)} 
                    onValueChange={onMeetingStartChange}/>

                <SimpleDurationInput 
                    minValue={0} 
                    maxValue={60} 
                    value={DateConverter.convertTimeStringtoDate(editedMeeting.duration).getMinutes()} 
                    onValueChange={ onDurationChange }/>

                {/* We should have a picker for type here */}
                <div className="mt-2 d-flex justify-content-end">
                        <button 
                            onClick={addMeeting} 
                            className="btn">Save</button>
                </div>
                
        </div>
    )
}
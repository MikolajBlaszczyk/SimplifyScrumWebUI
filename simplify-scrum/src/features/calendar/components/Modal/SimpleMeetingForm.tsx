import { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import { MeetingFactory, Meeting, MeetingType } from "../../data/ModelsIndex"
import { MeetingSerivce } from "../../service/MeetingService"
import { useLoading } from "../../../../hooks/useContexts"
import { AccountService } from "../../../account-settings/service/AccountService"
import { User } from "../../../../data/User"
import { SelectItem, SimpleDateInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { SimpleDurationInput } from "../../../../components/form/SimpleDurationInput"
import { DateConverter } from '../../../../utils/DateConverter';
import { EnumService } from "../../../backlog/service/ServiceIndex"

interface properties{
    initialMeeting: Meeting | null
    clickedDay: Date
}


export default function SimpleMeetingForm(props: properties){
    const [leadersOptions, setLeadersOptions] = useState<SelectItem<User>[]>([])
    const [selectedLeader, setSelectedLeaeder] = useState<User>(User.default())

    let meetingOptions: SelectItem<MeetingType>[] = []

    const {initialMeeting, clickedDay} = props
    const {isLoading, setIsLoading} = useLoading()
    const [isNew, setIsNew] = useState(initialMeeting == null)
   
    const [editedMeeting, setEditedMeeting] = useState<Meeting>(
        MeetingFactory.copy(initialMeeting ?? {...MeetingFactory.default, start: clickedDay})
    )

    useEffect(() => {
        AccountService.getUsers()
        .then(data => {
            setLeadersOptions(data.map(user => {
                const item: SelectItem<User> = {
                    value: user,
                    description: user.nickname
                }
                return item
            }))
        })

        meetingOptions = MeetingSerivce
            .GetAllMeetingTypes()
            .map(type => {
                const item: SelectItem<MeetingType> = { 
                    value: type as MeetingType,
                    description: type.toString()
                }
                return item
            }) 
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
                <SimpleSelectionInput 
                    label="Leader"
                    selectedValue={selectedLeader} 
                    onSelectedValueChange={ onLeaderChange }
                    options={leadersOptions} />
                <SimpleDateInput 
                    value={new Date(editedMeeting.start)} 
                    onValueChange={onMeetingStartChange}/>
                <SimpleSelectionInput 
                    label="Meeting Type"
                    selectedValue={editedMeeting.type} 
                    onSelectedValueChange={onMeetingTypeChnage} 
                    options={meetingOptions} />
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
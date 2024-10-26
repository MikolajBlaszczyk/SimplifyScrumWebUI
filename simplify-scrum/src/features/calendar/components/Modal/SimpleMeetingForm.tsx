import { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import { MeetingFactory, Meeting, MeetingType } from "../../data/ModelsIndex"
import { MeetingSerivce } from "../../service/MeetingService"
import { useLoading } from "../../../../hooks/SimpleContexts"
import { UserService } from "../../../account-settings/service/UserService"
import { User } from "../../../common-data/User"
import { SimpleDateInput, SimpleSelectionInput, SimpleTextInput } from "../../../../components/ComponentsIndex"
import { SimpleDurationInput } from "../../../../components/form/SimpleDurationInput"
import { DateConverter } from '../../../../utils/DateConverter';

interface properties{
    initialMeeting: Meeting | null
    clickedDay: Date
}


export default function SimpleMeetingForm(props: properties){
    const [leaders, setLeaders] = useState<User[]>([] as User[])
    
    const typesDescriptions = useMemo(() => {
        let values = []
        for(let type in MeetingType){
            if(isNaN(Number(type))){
                values.push(type)
            }
        }
        return values;
    },[])
   
    const typesValues = useMemo(()  => {
        let values = []
        for(let type in Object.values(MeetingType)){
            if(isNaN(Number(type))){
                values.push(type)
            }
        }
        return values;
    }, [])
    
    const {initialMeeting, clickedDay} = props
    const {isLoading, setIsLoading} = useLoading()
    const [isNew, setIsNew] = useState(initialMeeting == null)
   
    const [editedMeeting, setEditedMeeting] = useState<Meeting>(
        MeetingFactory.copy(initialMeeting ?? {...MeetingFactory.default, start: clickedDay})
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
                    changeValue={changeName}/>
                <SimpleTextInput 
                    label="Description"
                    value={editedMeeting.description}
                    changeValue={changeDescription}/>
                <SimpleSelectionInput 
                    label="Leader"
                    selectedValue={editedMeeting.leaderId} 
                    onSelectedValueChange={ onLeaderChange }
                    optionsValues={leaders.map(l => l.id)} 
                    optionsDescriptions={leaders.map(l => l.nickname)}/>
                <SimpleDateInput 
                    value={new Date(editedMeeting.start)} 
                    onValueChange={onMeetingStartChange}/>
                <SimpleSelectionInput 
                    label="Meeting Type"
                    selectedValue={MeetingType[editedMeeting.type]} 
                    onSelectedValueChange={onMeetingTypeChnage} 
                    optionsValues={typesValues} 
                    optionsDescriptions={typesDescriptions}/>
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
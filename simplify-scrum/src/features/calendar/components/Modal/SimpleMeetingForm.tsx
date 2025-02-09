import { useEffect, useState } from "react"
import { MeetingFactory, MeetingType, User } from "../../../../data/CommonDataIndex"
import { MeetingSerivce } from "../../../../services/CommonServicesIndex"
import { useAlert, useLoading } from "../../../../hooks/HooksIndex"
import { AccountService } from "../../../account-settings/service/AccountService"
import { TextInput, SelectionInput, Button } from "../../../../components/ComponentsIndex"
import { DateConverter } from '../../../../utils/utility-services/DateSerivces';
import { GenericEnumService } from "../../../../services/enum/GenericEnumService"
import { AlertStyle, AlertType } from "../../../alerting/components/Alert"
import { MultiTextInput } from "../../../../components/form/text-input/MultiTextInput"
import { CalendarInput } from "../../../../components/form/calendar/CalendarInput"
import { RangeInput } from "../../../../components/form/range-input/RangeInput"
import { MultiSelectionInput } from '../../../../components/form/selection-input/MultiSelectionInput';
import { Role, Size, Style } from '../../../../components/common/button/ButtonProps';
import { ValidationResult } from '../../../../components/form/shared/SharedProps';
import { SelectItem } from "../../../../components/form/selection-input/SelectionInputProps"

enum Action {
    Add,
    Update
}

interface properties{
    meetingGuid?: string,
    clickedDay: Date,
    onMeetingUpdated: () => void
}

interface nameState {
    name: string,
    validationResult: ValidationResult
}

interface descriptionState {
    description: string,
    validationResult: ValidationResult
}

interface typeState {
    type?: MeetingType
    ValidationResult: ValidationResult
}

interface leaderState {
    leaderGuid?: string,
    validationResult: ValidationResult
}

interface startState {
    start: Date,
    validationResult: ValidationResult
}

interface durationState {
    duration: number,
    validationResult: ValidationResult
}

export default function SimpleMeetingForm({meetingGuid, clickedDay, onMeetingUpdated} : properties){
    const showAlert = useAlert()
    const [added, setAdded] = useState(false)
    const [action, setAction] = useState<Action>(meetingGuid == undefined ? Action.Add : Action.Update)
    const {shouldReload: isLoading, setShouldReload: setIsLoading} = useLoading()
    const currentDateTime = new Date()
    const clickedDayWithTime = new Date(clickedDay)
    clickedDayWithTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes() + 35, currentDateTime.getSeconds())

    const [nameState, setNameState] = useState<nameState>({name: '', validationResult: {isValid: true, message: ""}})
    const [descriptionState, setDescriptionState] = useState<descriptionState>({description: '', validationResult: {isValid: true, message: ""}})
    const [typeState, setTypeState] = useState<typeState>({type: undefined, ValidationResult: {isValid: true, message: ""}})
    const [leaderState, setLeaderState] = useState<leaderState>({leaderGuid: undefined, validationResult: {isValid: true, message: ""}})
    const [startState, setStartState] = useState<startState>({start: clickedDayWithTime, validationResult: {isValid: true, message: ""}})
    const [durationState, setDurationState] = useState<durationState>({duration: 10, validationResult: {isValid: true, message: ""}})

    const [allUsers, setAllUsers] = useState<User[]>([])
    const [allOptions, setAllOptions] = useState<SelectItem[]>([])
    const [selectedUsers, setselectedUsers] = useState<SelectItem[]>([])
    const [leadersOptions, setLeadersOptions] = useState<SelectItem[]>([])
    const [meetingOptions, setMeetingOptions] = useState<SelectItem[]>([])

    const nameIsValid = () => {
        if(nameState.name.length == 0){
            setNameState(prev => ({...prev, validationResult: {isValid: false, message: "Name is required"}}))
            return false
        }
        setNameState(prev => ({...prev, validationResult: {isValid: true, message: ""}}))
        return true
    }

    const descriptionIsValid = () => {
        if(descriptionState.description.length == 0){
            setDescriptionState(prev => ({...prev, validationResult: {isValid: false, message: "Description is required"}}))
            return false
        }
        setDescriptionState(prev => ({...prev, validationResult: {isValid: true, message: ""}}))
        return true
    }

    const typeIsSelected = () => {
        if(typeState.type === undefined){
            setTypeState(prev => ({...prev, ValidationResult: {isValid: false, message: "Type is required"}}))
            return false
        }
        setTypeState(prev => ({...prev, ValidationResult: {isValid: true, message: ""}}))
        return true
    }

    const leaderIsSelected = () => {
        if(leaderState.leaderGuid === undefined){
            setLeaderState(prev => ({...prev, validationResult: {isValid: false, message: "Leader is required"}}))
            return false
        }
        setLeaderState(prev => ({...prev, validationResult: {isValid: true, message: ""}}))
        return true
    }

    const startIsValid = () => {
        const now = new Date();
        const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);

        if (startState.start < thirtyMinutesFromNow) {
            setStartState(prev => ({...prev, validationResult: {isValid: false, message: "Start date needs to be at least 30 minutes from now"}}));
            return false;
        }
        setStartState(prev => ({...prev, validationResult: {isValid: true, message: ""}}))
        return true
    }

    const clearInputs = () => {
        setNameState(prev => ({...prev, name: "", validationResult: {isValid: true, message: ""}}))
        setDescriptionState(prev => ({...prev, description: "", validationResult: {isValid: true, message: ""}}))
        setTypeState(prev => ({...prev, type: undefined, ValidationResult: {isValid: true, message: ""}}))
        setLeaderState(prev => ({...prev, leaderGuid: undefined, validationResult: {isValid: true, message: ""}}))
        setStartState(prev => ({...prev, start: clickedDayWithTime, validationResult: {isValid: true, message: ""}}))
        setDurationState(prev => ({...prev, duration: 0, validationResult: {isValid: true, message: ""}}))
        setselectedUsers([])
    }
   
    const save = async () => {
        let isValid = true
        isValid = nameIsValid() && isValid
        isValid = descriptionIsValid() && isValid
        isValid = typeIsSelected() && isValid
        isValid = leaderIsSelected() && isValid
        isValid = startIsValid() && isValid
        if(isValid == false)
            return
        
        let meeting = MeetingFactory.createMeeting( 
            nameState.name,
            descriptionState.description,
            typeState.type!,
            leaderState.leaderGuid!,
            startState.start,
            DateConverter.convertDateToTimeString(new Date(0,0,0,0,durationState.duration)), 
            selectedUsers.map(user => user.value))

        meeting.guid = meetingGuid ?? ""   
        const result =  action == Action.Add ? await MeetingSerivce.add(meeting) :  await MeetingSerivce.update(meeting)
        if(result == null){
            showAlert(AlertStyle.Danger, "Could not add Meeting.", "Error while adding meeting", AlertType.Confirm)
            return    
        } else {
            setAdded(true)
            onMeetingUpdated()
        }
        clearInputs()
        setIsLoading(isLoading + 1)
    }

    const fetchMeeting = async () => {
        if(meetingGuid == undefined)
            return
        
        const meeting = await MeetingSerivce.getMeeting(meetingGuid!)

        setNameState(prev => ({...prev, name: meeting.name, validationResult: {isValid: true, message: ""}}))
        setDescriptionState(prev => ({...prev, description: meeting.description, validationResult: {isValid: true, message: ""}}))
        setTypeState(prev => ({...prev, type: meeting.type, ValidationResult: {isValid: true, message: ""}}))
        setLeaderState(prev => ({...prev, leaderGuid: meeting.leaderGuid, validationResult: {isValid: true, message: ""}}))
        setStartState(prev => ({...prev, start: new Date(meeting.start), validationResult: {isValid: true, message: ""}}))
        setDurationState(prev => ({...prev, duration: DateConverter.convertTimeStringToDate(meeting.duration).getMinutes(), validationResult: {isValid: true, message: ""}}))


        

        setselectedUsers(meeting.userGuids?.filter(guid => guid != meeting.leaderGuid).map(userGuid => {
            const user = allOptions.find(option => option.value == userGuid)
            return user ?? {value: "", description: ""}
        }) ?? [])
     }

    const fetchData = async () => {
        const users = await AccountService.getUsers();
        
        setAllUsers(users)
        setLeadersOptions(users.map(user => {
            const item: SelectItem = {
                value: user.id,
                description: user.nickname
            }
            return item
        }))


        
        setAllOptions(users.filter(u => u.id != leaderState.leaderGuid).map(user => {  
            
            return {value: user.id, description: user.nickname}
         }))

        const types = GenericEnumService.getEnumNames(MeetingType)

        setMeetingOptions(types.map(type => {
            const enumValue = MeetingType[type as keyof typeof MeetingType];
            const item: SelectItem = {
                value: enumValue.toString(),
                description: type
            }
            return item
        }))

        await fetchMeeting()
    }

    useEffect(() => {
        if(meetingGuid != undefined){
            setAction(Action.Update)
        }

        fetchData()

    }, [meetingGuid])

    useEffect(() => {
        setTimeout(() => {
            setAdded(false)
        }, 3000)
    }, [added])

    const onMeetingTypeChange = (newValue: string) => {
        const meetingTypeValue = parseInt(newValue) 

        setTypeState(prev => ({...prev, type: meetingTypeValue as MeetingType}))
    }
  
    return (
        <div className="d-flex flex-column p-3">
            <TextInput 
                icon="bi-alphabet"
                placeholder="Name"
                value={nameState.name} 
                validation={nameState.validationResult}
                tooltipContent="Give your meeting a meaningful name."
                changeValue={(e) => setNameState(prev => ({...prev, name: e}))} 
            />
          
            <MultiTextInput 
                className="mt-3"
                icon="bi-card-text"
                placeholder="Description"
                tooltipContent="Let know what the meeting is about."
                validation={descriptionState.validationResult}
                value={descriptionState.description}
                changeValue={e => setDescriptionState(prev => ({...prev, description: e}))}
            />
              
            <SelectionInput 
                className="mt-3"
                icon="bi-calendar-event"
                placeholder="Meeting type"
                tooltipContent="Select the type of the meeting."
                validation={typeState.ValidationResult}
                selectedValue={typeState.type ? MeetingType[typeState.type].toString() : undefined} 
                onSelectedValueChange={e => onMeetingTypeChange(e)} 
                options={[...meetingOptions]}
            />

            <SelectionInput 
                className="mt-3"
                icon="bi-person-fill"
                placeholder="Meeting leader"
                tooltipContent="Select the leader of the meeting."
                validation={leaderState.validationResult}
                selectedValue={leaderState.leaderGuid ?? undefined} 
                onSelectedValueChange={e => {
                    const users = allUsers.filter(u => u.id != e)
                    setAllOptions(prev => users.filter(u => u.id != leaderState.leaderGuid).map(u => { 
                        return {value: u.id, description: u.nickname} 
                    }))
                    setselectedUsers(prev => prev.filter(u => u.value != e))
                    setLeaderState(prev => ({...prev, leaderGuid: e}))
                }} 
                options={[...leadersOptions]} 
            />

            <CalendarInput 
                icon="bi-calendar"
                placeholder="Date"
                className="mt-3"
                time={true}
                tooltipContent="Select the date of the meeting."
                validation={startState.validationResult}
                value={new Date(startState.start)} 
                onValueChange={e => setStartState(prev => ({...prev, start: new Date(e)}))}
            />

            <RangeInput 
                icon="bi-clock"
                placeholder="Duration"
                tooltipContent="Select the duration of the meeting."
                minValue={10} 
                className="mt-3"
                maxValue={60} 
                value={durationState.duration}
                onValueChange={e => setDurationState(prev => ({...prev, duration: e}))}
            />

            <MultiSelectionInput 
                icon="bi-person-fill"
                className="mt-3"
                selectedValues={selectedUsers}
                onSelectedValuesChange={(e) => setselectedUsers(e)} 
                options={allOptions} 
            />

            <div className="mt-4 d-flex justify-content-between">
                <div>
                    {added && <h6>Success</h6>}
                </div>

                <Button 
                    size={Size.Large}
                    title={action == Action.Add ? "Save" : "Update"}
                    style={Style.Filled}
                    role={Role.Primary}
                    onClick={() => save()} 
                />
            </div>
        </div>
    )
}
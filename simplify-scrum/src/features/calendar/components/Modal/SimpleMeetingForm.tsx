import { useEffect, useState } from "react"
import { MeetingFactory, Meeting, MeetingType, User, DayModel } from "../../../../data/CommonDataIndex"
import { EnumService, MeetingEnumService, MeetingSerivce } from "../../../../services/CommonServicesIndex"
import { useAlert, useLoading, useModal } from "../../../../hooks/HooksIndex"
import { AccountService } from "../../../account-settings/service/AccountService"
import { Color, MultiSelectDropdown, SelectItem, SimpleDateInput, SimpleMultiLineTextInput,  SimpleSelectionInput, SimpleTextInput, Option } from "../../../../components/ComponentsIndex"
import { SimpleDurationInput } from "../../../../components/form/SimpleDurationInput"
import { DateConverter } from '../../../../utils/utility-services/DateSerivces';
import { BgColor, FontColor } from "../../../../utils/UtilsIndex"
import { GenericEnumService } from "../../../../services/enum/GenericEnumService"
import { AlertType } from "../../../alerting/components/Alert"


enum Action {
    Add,
    Update
}

interface properties{
    meetingGuid?: string,
    clickedDay: Date
}


interface State {
    guid?: string,
    name: string,
    description: string,
    type: MeetingType,
    leaderGuid: string,
    start: Date,
    duration: number
}


export default function SimpleMeetingForm({meetingGuid, clickedDay} : properties){
    const showAlert = useAlert()
    const {shouldReload: isLoading, setShouldReload: setIsLoading} = useLoading()

    const [allOptions, setAllOptions] = useState<Option[]>([])
    const [selectedUsers, setselectedUsers] = useState<Option[]>([])
    const [leadersOptions, setLeadersOptions] = useState<SelectItem[]>([])
    const [meetingOptions, setMeetingOptions] = useState<SelectItem[]>([])

    const [action, setAction] = useState<Action>(meetingGuid == undefined ? Action.Add : Action.Update)
    const [form, setForm] = useState<State>({
        name: '',
        description: '',
        type: MeetingType.custom,
        leaderGuid: '',
        start: clickedDay,
        duration: 0
     } as State)

   
    
   
    const save = async () => {
        const {name, description, type, leaderGuid, start, duration, guid} = form
        if(name == '' || leaderGuid == ''){
            showAlert(AlertType.Danger, 'Please fill all fields', "Error")
            return
        }
        
        let meeting = MeetingFactory.createMeeting(name, description, type, leaderGuid, start, DateConverter.convertDateToTimeString(new Date(0,0,0,0,duration)), [])
        meeting.guid = guid ?? ""   
        meeting.userGuids = selectedUsers.map(user => user.value)

        action == Action.Add ? await MeetingSerivce.add(meeting) :  await MeetingSerivce.update(meeting)
        setIsLoading(isLoading + 1)
    }

   

    const fetchMeeting = async () => {
        if(meetingGuid == undefined)
            return
        

        const meeting = await MeetingSerivce.getMeeting(meetingGuid!)
        setForm(prev => ({
            ...prev,
            name: meeting.name,
            description: meeting.description,
            type: meeting.type,
            leaderGuid: meeting.leaderGuid,
            start: meeting.start,
            duration: DateConverter.convertTimeStringtoDate(meeting.duration).getMinutes(),
        }))
        setselectedUsers(meeting.userGuids.map(userGuid => {
            const user = allOptions.find(option => option.value == userGuid)
            return user ?? {value: "", label: ""}
        }))
    }

    const fetchData = async () => {
        const users = await AccountService.getUsers();
        
        setLeadersOptions(users.map(user => {
            const item: SelectItem = {
                value: user.id,
                description: user.nickname
            }
            return item
        }))

        setAllOptions(users.map(user => { return {value: user.id, label: user.nickname} }))

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
        
        if(meetingGuid != undefined){
            setForm(prev => ({...prev, guid: meetingGuid}))
        }

    }, [meetingGuid])


    const onLeaderChange = (newValue: string) => {
        setForm(prev => ({...prev, leaderGuid: newValue}))
    }

    const onMeetingTypeChange = (newValue: string) => {
        const meetingTypeValue = newValue as keyof typeof MeetingType;
        const meeting = MeetingType[meetingTypeValue];
        setForm(prev => ({...prev, type: meeting}))
    }
  

    return (
        <div className="d-flex flex-column p">
                <SimpleTextInput 
                    icon="bi-alphabet"
                    label="Name"
                    value={form.name}
                    fontcolor={FontColor.Dark}
                    color={BgColor.Transparent}
                    changeValue={(e) => setForm(prev =>  ({...prev, name: e.target.value}))}/>
                <div className="mt-1 mb-2"></div>
                <SimpleMultiLineTextInput 
                    icon="bi-card-text"
                    label="Description"
                    value={form.description}
                    onChange={e => setForm(prev => ({...prev, description: e.target.value}))}/>

                <SimpleSelectionInput
                    icon="bi-calendar-event"
                    label="Type"
                    selectedValue={MeetingType[form.type]} 
                    onSelectedValueChange={e => onMeetingTypeChange(e)} 
                    options={[...meetingOptions]} />

                <SimpleSelectionInput
                    icon="bi-person-fill"
                    label="Leader"
                    selectedValue={form.leaderGuid ?? ""} 
                    onSelectedValueChange={e => onLeaderChange(e)} 
                    options={[...leadersOptions]} />

                <SimpleDateInput 
                    label="Date"
                    icon=""
                    value={new Date(form.start)} 
                    onValueChange={e =>  setForm(prev => ({...prev, start: new Date(e)}))}/>

                <SimpleDurationInput 
                    label="Duration"
                    icon="bi-clock"
                    minValue={0} 
                    maxValue={60} 
                    value={form.duration} 
                    onValueChange={e => setForm(prev => ({...prev, duration: e}))}/>

                <MultiSelectDropdown 
                    label="Users"
                    icon="bi-person-fill"
                    options={allOptions} 
                    selectedOptions={selectedUsers} 
                    onChange={(selected) => setselectedUsers(selected)} />


                {/* We should have a picker for type here */}
                <div className="mt-2 d-flex justify-content-end">
                        <button 
                            onClick={() => save()} 
                            className="btn">{action == Action.Add ? "Save" : "Update"}</button>
                </div>
                
        </div>
    )
}
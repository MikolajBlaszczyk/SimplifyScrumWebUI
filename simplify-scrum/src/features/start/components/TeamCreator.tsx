import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { UserEditableSettings, UserSelectionSetting } from "../../account-settings/components/UserEditableSettings";
import { Button, SelectionInput, SimpleSelectionInput, TextInput } from "../../../components/ComponentsIndex";
import { Fonts } from "../../../utils/UtilsIndex";
import { AccountService } from "../../account-settings/service/AccountService";
import { Team, User } from "../../../data/CommonDataIndex";
import { useAlert, useHideModal } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { JoruneyComponentProps } from "./StartJourney";
import { SelectItem } from '../../../components/form/selection-input/SelectionInputProps';
import { SelectState, TextState } from "../../../components/form/shared/SharedProps";
import { set } from 'date-fns';
import { Role, Size, Style } from "../../../components/common/button/ButtonProps";

interface Props {
    journeyProps: JoruneyComponentProps
    team: Team
}



export function TeamCreator({journeyProps, team}: Props) {
    const hideModal = useHideModal()
    const showAlert = useAlert()
    const [nameState, setNameState] = useState<TextState>({value: team.name, validation: {isValid: true, message: ""}})
    const [teamLeaderState, setTeamLeaderState] = useState<SelectState>({value: '', validation: {isValid: true, message: ""}})
    const [teamLeader, setTeamLeader] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])

    const createTeam = () => {
        if(nameState.value.length == 0) {
            showAlert(AlertStyle.Danger, "You need to provide name")
            return
        } 
        if(teamLeader == null){
            showAlert(AlertStyle.Danger, "You need to select team leader")
            return
        } 

        const team = new Team("", nameState.value, teamLeader!.id)

        AccountService
            .addTeam(team)
            .then(date => {
                hideModal()
                showAlert(AlertStyle.Info, "Successfully added team")    
                journeyProps.setJourneyState(prev => ({...prev, done: true}))
            })
            .catch(err => {
                showAlert(AlertStyle.Danger, err)
            })
    }   

    useEffect(() => {
        AccountService
            .getInfo()
            .then(data => {
                setUsers([data])
                setTeamLeader(data)
            })
            .catch(err => {
                showAlert(AlertStyle.Danger, err, "Error")
            })

       
    }, [])

    return(
        <div className="d-flex w-100">
            <section className="bg-dark p-0 mt-3 s-settings-section d-flex w-100  ">
              
                <TextInput 
                    icon="bi-alphabet"
                    placeholder={"Name"} 
                    value={nameState.value}
                    validation={nameState.validation}
                    changeValue={(e) => setNameState(prev => ({...prev, value: e}))}/>
                

                <SelectionInput 
                    className="mt-3"
                    icon="bi-person-fill-up"
                    selectedValue={teamLeaderState.value}
                    onSelectedValueChange={(value) => {
                        setTeamLeaderState(prev => ({...prev, value: value}))
                    }} 
                    options={users.map(user => ({value: user.teamGuid, description: user.nickname}))} />


              
                
                <div className="mt-4 d-flex justify-content-center">
                    <Button 
                        title={"Save"} 
                        role={Role.Primary}
                        size={Size.Large}
                        style={Style.Filled}
                        onClick={() => createTeam()}/>
                </div>
               
            </section>
           
        </div>
    )
}
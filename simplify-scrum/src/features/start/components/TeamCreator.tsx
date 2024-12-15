import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { UserEditableSettings, UserSelectionSetting } from "../../account-settings/components/UserEditableSettings";
import { Button, SelectItem, SimpleSelectionInput } from "../../../components/ComponentsIndex";
import { Fonts } from "../../../utils/UtilsIndex";
import { AccountService } from "../../account-settings/service/AccountService";
import { Team, User } from "../../../data/CommonDataIndex";
import { useAlert, useHideModal } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { JoruneyComponentProps } from "./StartJourney";

interface Props {
    journeyProps: JoruneyComponentProps
    team: Team
}

export function TeamCreator({journeyProps, team}: Props) {
    const hideModal = useHideModal()
    const showAlert = useAlert()
    const [name, setName] = useState(team.name)
    const [teamLeader, setTeamLeader] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])

    const createTeam = () => {
        if(name.length == 0) {
            showAlert(AlertStyle.Danger, "You need to provide name")
            return
        } 
        if(teamLeader == null){
            showAlert(AlertStyle.Danger, "You need to select team leader")
            return
        } 

        const team = new Team("", name, teamLeader!.id)

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
              

                <UserEditableSettings 
                    icon={"bi-alphabet"} 
                    label={"Name"} 
                    value={name} 
                    onChange={(e) => {setName(e.target.value)}} />    
                
                <div className="mt-2"></div>


                <SimpleSelectionInput 
                    label={"Leader"} 
                    icon="bi-person-fill-up"
                    selectedValue={teamLeader != null ? teamLeader.id ?? "Choose" : "Choose"}
                    onSelectedValueChange={(newValue) => { 
                        const newTeamLeader = users.filter(user => user.id == newValue)[0]!
                        setTeamLeader(newTeamLeader)
                    }}
                    options={users.map(user => ({value: user.teamGuid, description: user.nickname}) )} />
                
                <div className="mt-4 d-flex justify-content-center">
                    {/* <SimpleButton 
                        type={Button.Primary}
                        title={"Save"} 
                        font={Fonts.H6}
                        onClick={() => {createTeam()}} /> */}
                </div>
               
            </section>
           
        </div>
    )
}
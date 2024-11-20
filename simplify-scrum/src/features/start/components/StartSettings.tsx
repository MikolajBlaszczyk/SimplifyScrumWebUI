import { MouseEvent, useEffect, useState } from "react";
import { UserCheckboxSetting, UserEditableSettings, UserSelectionSetting } from "../../account-settings/components/UserEditableSettings";
import { Button, SimpleButton } from "../../../components/ComponentsIndex";
import { User } from "../../../data/CommonDataIndex";
import { BacklogService } from "../../../services/CommonServicesIndex";
import { AccountService } from "../../account-settings/service/AccountService";
import { JoruneyComponentProps } from "./StartJourney";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertType } from "../../alerting/components/Alert";



export function StartSettings({setJourneyState}: JoruneyComponentProps) { 
    const showAlert = useAlert()

    const [nickname, setNickname] = useState<string>('')
    const [darkMode, setDarkMode] = useState(false)
    const [email, setEmail] = useState('')

    useEffect(() => {
        AccountService  
            .getInfo()
            .then(data => {
                if(data != null){
                    setJourneyState(prev => ({...prev, done: true}))
                    setNickname(data.nickname)
                    setEmail(data.email)
                }
            })
    }, []) 

    const saveSettings = () => {
        let validationAlert = false
        if(nickname.length == 0){ 
            showAlert(AlertType.Danger, "You need to specify NICKNAME")
            validationAlert = true
        } 
        if(email.length == 0){
            showAlert(AlertType.Danger, "You need to specify EMAIL")
            validationAlert = true
        }
        if(validationAlert)
            return
        

        const user = User.default()
        user.email = email 
        user.nickname = nickname

        AccountService
            .updateUser(user)
            .then(data => {
                showAlert(AlertType.Info, "Initial information were saved.", "Success")
                setJourneyState(prev => ({...prev, done: true}))
            })
            .catch(error => {
                showAlert(AlertType.Danger, error)
            })
    } 


    return ( 
        <section className="bg-dark s-settings-section d-flex flex-column justify-content-center w-100 align-items-center " style={{height: "45vh"}}> 
            <div className="w-100 ">
                <h3 className="mb-2  align-self-start user-select-none">
                    Initial settings
                </h3>

                <div className="d-flex mt-3 flex-column w-100">
                    <UserEditableSettings 
                        icon={"bi-person-badge"} 
                        label={"Nickname"} 
                        value={nickname} 
                        onChange={e => setNickname(e.target.value)}/>

                    <UserEditableSettings 
                                icon={"bi-at"} 
                                label={"Email"} 
                                value={email}
                                onChange={(e) =>  setEmail(e.target.value)}/>
                    
                    <UserCheckboxSetting 
                        label={"Dark theme"}
                        icon={"bi-moon-fill"}
                        onChange={(newValue) => setDarkMode(newValue) } 
                        value={darkMode} />
                </div>
            

                <div className="w-100 mt-4 d-flex justify-content-center ">
                    <SimpleButton 
                        type={Button.Secondary}
                        title={"Update"}
                        onClick={e => {saveSettings()}} />
                </div>
            </div>
        </section>
    )
}
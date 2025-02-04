import { MouseEvent, useEffect, useState } from "react";
import { Button, TextInput } from "../../../components/ComponentsIndex";
import { User } from "../../../data/CommonDataIndex";
import { BacklogService } from "../../../services/CommonServicesIndex";
import { AccountService } from "../../account-settings/service/AccountService";
import { JoruneyComponentProps } from "./StartJourney";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { Role, Size, Style } from '../../../components/common/button/ButtonProps';



export function StartSettings({setJourneyState}: JoruneyComponentProps) { 
    const showAlert = useAlert()

    const [nickname, setNickname] = useState<string>('')
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
            showAlert(AlertStyle.Danger, "You need to specify NICKNAME")
            validationAlert = true
        } 
        if(email.length == 0){
            showAlert(AlertStyle.Danger, "You need to specify EMAIL")
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
                showAlert(AlertStyle.Info, "Initial information were saved.", "Success")
                setJourneyState(prev => ({...prev, done: true}))
            })
            .catch(error => {
                showAlert(AlertStyle.Danger, error)
            })
    } 


    return ( 
        <section className="bg-dark s-settings-section d-flex flex-column justify-content-center w-100 align-items-center " style={{height: "35vh"}}> 
            <div className="w-100 ">
                <h3 className="mb-2  align-self-start user-select-none">
                    Initial settings
                </h3>

                <div className="d-flex mt-3 flex-column w-100">
                    <TextInput 
                        tooltipContent="Name that other user will see"
                        icon="bi-person-badge"
                        placeholder="Nickname"
                        value={nickname} 
                        changeValue={value => setNickname(value)}/>

                    <TextInput 
                    className="mt-3"
                        tooltipContent="Email"
                        icon="bi-at"
                        placeholder="Email"
                        value={email} 
                        changeValue={(value) => setEmail(value)}/>
                    
          
                </div>
            

                <div className="w-100 mt-3 d-flex justify-content-center ">
                    <Button 
                        role={Role.Primary}
                        style={Style.Filled}
                        size={Size.Large}
                        title="Save"
                        onClick={() => {
                            saveSettings()
                        }}/>
                </div>
            </div>
        </section>
    )
}
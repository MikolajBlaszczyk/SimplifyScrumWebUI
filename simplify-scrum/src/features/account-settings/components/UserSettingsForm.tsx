import { ChangeEvent, useContext, useEffect, useState } from "react"
import { AccountService } from "../service/AccountService"
import UserInformation from "./UserInfo";
import { User, UserInfo } from "../../../data/CommonDataIndex";
import { SimpleTextInput, SimpleSwitch } from "../../../components/ComponentsIndex";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { UserEditableSettings, UserCheckboxSetting } from './UserEditableSettings';



export default function UserSettingsForm(){ 
    const [user, setUser] = useState<UserInfo>(User.default())
    const [darkMode, setDarkMode] = useState<boolean>(false) //TODO: implement context here
    const showAlert = useAlert()

    useEffect(() => {
        AccountService
            .getInfo()
            .then(data => setUser(data))
            .catch(err => { showAlert(AlertStyle.Danger, err.message)})
        
    }, [])

 
    const setNewUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({...prev, username: e.target.value}))
    }
    const setNewNickname = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({...prev, nickname: e.target.value}))
    }
    const setNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({...prev, email: e.target.value}))
    }
 
   

    // dark theme 

    return(
            <form className="d-flex flex-column" onSubmit={e => e.preventDefault()}>
                <UserInformation user={user}/>

                <section className="mb-5 bg-dark s-settings-section"> 
                    <h4 className="mb-2">
                        Personal
                    </h4>

                    <UserEditableSettings 
                        icon={"bi-file-person-fill"} 
                        label={"Username"} 
                        value={user.username}
                        onChange={setNewUsername}/>

                    <UserEditableSettings 
                        icon={"bi-eye"} 
                        label={"Nickname"} 
                        value={user.nickname}
                        onChange={setNewNickname}/>
                   
                    <UserEditableSettings 
                        icon={"bi-at"} 
                        label={"Email"} 
                        value={user.email}
                        onChange={setNewEmail}/>
                 
                </section>

                <section className="mb-5 bg-dark s-settings-section">
                    <h4 className="mb-2">
                        App
                    </h4>
                    
                    <UserCheckboxSetting 
                        label={"Dark theme"}
                        icon={"bi-moon-fill"}
                        onChange={(newValue) => setDarkMode(newValue) } 
                        value={darkMode} />
                </section>
            </form>
    )
}
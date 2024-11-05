import { ChangeEvent, useContext, useEffect, useState } from "react"
import { AccountService } from "../service/AccountService"
import UserInformation from "./UserInfo";
import { User, UserInfo } from "../../../data/CommonDataIndex";
import { SimpleTextInput, SimpleSwitch } from "../../../components/ComponentsIndex";
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertType } from "../../alerting/components/Alert";
import { UserEditableSettings } from "./UserEditableSettings";



export default function UserSettingsForm(){ 
    const [user, setUser] = useState<UserInfo>(User.default())
    const [darkMode, setDarkMode] = useState<boolean>(false) //TODO: implement context here
    const showAlert = useAlert()

    useEffect(() => {
        AccountService
            .getInfo()
            .then(data => setUser(data))
            .catch(err => { showAlert(AlertType.Danger, err.message)})
        
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
                    <h4>
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
                    <h4>
                        App
                    </h4>
                    
                    <div className="d-flex align-items-center mb-1 mt-2">
                        <i className={`bi bi-moon-fill s-h5`}></i>
                        <div className="ms-2 d-flex justify-content-between w-100 align-items-center border-bottom s-settings-editable" onClick={() => setDarkMode(prev => !prev)}>
                            <h6 className="m-0">
                                    Dark theme
                            </h6> 
                            <SimpleSwitch 
                                isChecked={darkMode} 
                                onValueChange={ e => {
                                    setDarkMode(e.target.checked)
                                } } />
                        </div>
                    </div>
                 
                </section>
            </form>
       
    )
}
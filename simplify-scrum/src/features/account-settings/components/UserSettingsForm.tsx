import { ChangeEvent, useContext, useEffect, useState } from "react"
import "../../assets/Custom.scss"
import { AccountService } from "../service/AccountService"
import UserInformation from "./UserInfo";
import { User, UserInfo } from "../../authorization/data/Index";
import { SimpleTextInput, SimpleSwitch } from "../../../components/ComponentsIndex";



export default function UserSettingsForm(){ 
    const [user, setUser] = useState<UserInfo>(User.default())
    const [darkMode, setDarkMode] = useState<boolean>(false) //TODO: implement context here

    useEffect(() => {
        AccountService
            .getInfo()
            .then(data => setUser(data))
            .catch(err => {throw Error()})
        
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
       
            <form>
                <UserInformation user={user}/>
                <section> 
                    <SimpleTextInput 
                        label="Username"
                        value={user.username} 
                        changeValue={setNewUsername } />
                    <SimpleTextInput 
                        label="Nickname"
                        value={user.nickname} 
                        changeValue={ setNewNickname} />
                    <SimpleTextInput 
                        label="Email"
                        value={user.email} 
                        changeValue={setNewEmail } />
                </section>

                <section>
                    <SimpleSwitch 
                        isChecked={darkMode} 
                        onValueChange={ e => {
                            setDarkMode(e.target.checked)
                        } } />
                </section>
            </form>
       
    )
}
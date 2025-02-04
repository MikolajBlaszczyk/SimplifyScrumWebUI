import { useEffect, useState } from "react"
import { AccountService } from "../service/AccountService"
import UserInformation from "./UserInfo";
import { ExtendedDataLoader, User } from "../../../data/CommonDataIndex";
import {  Button, TextInput } from "../../../components/ComponentsIndex";
import { useAlert, useLoading } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { CheckState, TextState } from "../../../components/form/shared/SharedProps";
import { SwitchInput } from "../../../components/form/switch-input/SwitchInput";
import { Role, Size, Style } from "../../../components/common/button/ButtonProps";



export default function UserSettingsForm(){ 
    const {shouldReload, setShouldReload} =  useLoading();
    const [userLoader, setUserLoader] = useState<ExtendedDataLoader<User>>(ExtendedDataLoader.default())
    const [usernameState,setUsernameState] = useState<TextState>({value: '', validation: { isValid: true, message: ''}})
    const [nicknameState, setNicknameState] = useState<TextState>({value: '', validation: { isValid: true, message: ''}})
    const [emailState, setEmailState] = useState<TextState>({value: '', validation: { isValid: true, message: ''}})
    const [darkModeState,  setDarkModeState] = useState<CheckState>({checked: false, validation: {isValid: true, message: ''}})
    const showAlert = useAlert()

    const fetchData = async () => {
        try {
            const data = await AccountService.getInfo()
            if(data != null){
                setUserLoader(ExtendedDataLoader.dataFinishedLoading(userLoader, data, false))
                setUsernameState(prev => ({...prev, value: data.username}))
                setNicknameState(prev => ({...prev, value: data.nickname}))
                setEmailState(prev => ({...prev, value: data.email}))
            } else {
                setUserLoader(ExtendedDataLoader.dataFinishedLoading(userLoader, null, true))
            }
        } catch (error) {
            showAlert(AlertStyle.Danger, "Could not retrieve user information")
        }
    }

    useEffect(() => {
        fetchData()
    }, [shouldReload])

    const validate = () => {
        let isValid = true
        if(nicknameState.value.length < 3){
            setNicknameState(prev => ({...prev, validation: {isValid: false, message: 'Nickname must be at least 3 characters long'}}))
            isValid = false
        } else {
            setNicknameState(prev => ({...prev, validation: {isValid: true, message: ''}}))
        }
        if(usernameState.value.length < 3){
            setUsernameState(prev => ({...prev, validation: {isValid: false, message: 'Username must be at least 3 characters long'}}))
            isValid = false
        } else {
            setUsernameState(prev => ({...prev, validation: {isValid: true, message: ''}}))
        }
        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailState.value)){
            setEmailState(prev => ({...prev, validation: {isValid: false, message: 'Email is not valid'}}))
            isValid = false
        } else{
            setEmailState(prev => ({...prev, validation: {isValid: true, message: ''}}))
        }
        
        return isValid
    }

    const saveSettings = async () => {
        if(!validate())
            return

        const user = await AccountService.getInfo()
        user.username = usernameState.value 
        user.nickname = nicknameState.value
        user.email = emailState.value
        
        try{
            const response = await AccountService.updateUser(user)
            if(response != null){
                showAlert(AlertStyle.Success, "User information saved")
                setShouldReload(shouldReload + 1)
            } else {
                showAlert(AlertStyle.Danger, "Could not save user information")
            }
        } catch (error) {
            showAlert(AlertStyle.Danger, "Could not save user information")
        }


    }
   

    // dark theme need to be implemented

    return(
            <div className="s-bg-dark rounded ">
                <UserInformation />

                <section className="mb-2 s-settings-section"> 
                    <h5 >
                        Personal
                    </h5>

                    <TextInput 
                        className="mt-2"
                        placeholder="Username"
                        icon="bi-file-person-fill"
                        tooltipContent="Username"
                        validation={usernameState.validation}
                        value={usernameState.value} 
                        changeValue={(e) => setUsernameState(prev => ({...prev, value: e}))} />
      
                    <TextInput 
                        className="mt-3"
                        placeholder="Nickname"
                        icon="bi-eye"
                        tooltipContent="Nickname seen by others"
                        validation={nicknameState.validation}
                        value={nicknameState.value} 
                        changeValue={(e) => setNicknameState(prev => ({...prev, value: e}))} />
                     <TextInput 
                        className="mt-3"
                        placeholder="Email"
                        icon="bi-at"
                          tooltipContent="Email"
                        validation={emailState.validation}
                        value={emailState.value} 
                        changeValue={(e) => setEmailState(prev => ({...prev, value: e}))} />

                 
                </section>

                <section className="mb-2 s-settings-section">
                    <h4 >
                        App
                    </h4>
                    
                    <SwitchInput
                        className="mt-2"
                        validation={darkModeState.validation} 
                        isChecked={darkModeState.checked} 
                        placeholder="Dark theme"
                        icon="bi-moon-fill"
                        changeValue={(isChecked) => { 
                 
                            document.body.classList.toggle('dark-theme', isChecked)
                            document.body.classList.toggle('light-theme', !isChecked)
                          
                            setDarkModeState(prev => ({...prev, checked: isChecked}))
                        }} />
                </section>


                <section className="mb-2 s-settings-section d-flex justify-content-center">
                    <Button 
                        size={Size.Large}
                        style={Style.Filled}
                        role={Role.Primary}
                        title="Save"
                        onClick={() => {saveSettings()}} />
                </section>
            </div>
    )
}
import React, {useContext, useEffect, useState} from "react";
import { Global, UserContext } from "../../../context/ContextsIndex";
import { AuthProperties } from "../data/Index";
import { LoginService } from "../services/LoginService"
import { Button, TextInput, TextType, ValidationResult } from "../../../components/ComponentsIndex";
import { Role, Size, Style } from "../../../components/common/button/ButtonProps";
import { Alert, AlertStyle, AlertType } from "../../alerting/components/Alert";
import { useAlert } from "../../../hooks/useAlert";


interface LoginNameState {
    login: string,
    validationResult: ValidationResult
}

interface PasswordState {
    password: string,
    validationResult: ValidationResult
}

interface EmailState {
    email: string,
    validationResult: ValidationResult
}

interface NicknameState {
    nickname: string,
    validationResult: ValidationResult
}



export default function SignInForm(props: AuthProperties){
    const [emailState, setEmailState] = useState<EmailState>({email: '', validationResult: {isValid: true, message: ""}})
    const [nicknameState, setNicknameState] = useState<NicknameState>({nickname: '', validationResult: {isValid: true, message: ""}})
    const [loginState, setLoginState] = useState<LoginNameState>({login: '', validationResult: {isValid: true, message: ""}})
    const [passwordState, setPasswordState] = useState<PasswordState>({password: '', validationResult: {isValid: true, message: ""}})
    const {settings, setSettings} = useContext(UserContext) as Global
    const showAlert = useAlert()

    useEffect(() => {
        setSettings({...settings, isInStartupScreen: true})
    }, [])

    const validate = () => {
        let isValid = true

        if(loginState.login.length == 0){
            setLoginState(prev => ({...prev, validationResult: {isValid: false, message: "You need to provide a login."}}))
            isValid = false
        }
        if(passwordState.password.length == 0){
            setPasswordState(prev => ({...prev, validationResult: {isValid: false, message: "You need to provide a password."}}))
            isValid = false
        }
        if(emailState.email.length == 0){
            setEmailState(prev => ({...prev, validationResult: {isValid: false, message: "You need to provide an email."}}))
            isValid = false
        }
        if(nicknameState.nickname.length == 0){
            setNicknameState(prev => ({...prev, validationResult: {isValid: false, message: "You need to provide a nickname."}}))
            isValid = false
        }

        return isValid
    }


    const signInToSimplify = async () => {
        if(!validate()) return

        try{
            const response =  await LoginService.signIn(loginState.login, passwordState.password, emailState.email, nicknameState.nickname, 0)

            if(response.status == 200){
                props.setDisplayLogin(true)
            } else{
                showAlert(AlertStyle.Danger, response?.data.message, "Account creation failed", AlertType.Confirm)
            }


           
        } catch(error: any) {
            if (error.isAxiosError) {
                showAlert(AlertStyle.Danger, error.response?.data.message, "Account creation failed", AlertType.Confirm)
            }

            console.log(error)
        }
        
    }

    return (
        <form onSubmit={e => {e.preventDefault()}} className="position-relative d-flex flex-column w-100 h-100 justify-content-center align-items-center  ps-2 pe-2 s-form-transition" style={{padding: 50}}>
            <div className="pb-3 s-w-80">
                <TextInput 
                    icon="bi-at"
                    placeholder="Email"
                    value={emailState.email} 
                    validation={emailState.validationResult}
                    textType={TextType.Email}
                    changeValue={e => setEmailState(prev => ({...prev, email:e}))} />
            </div>  
        
            <div className="pb-3  s-w-80">
            <TextInput 
                    icon="bi-alphabet"
                    tooltipContent="User name visible to teammates."
                    placeholder="Nickname"
                    validation={nicknameState.validationResult}
                    value={nicknameState.nickname} 
                    changeValue={e => setNicknameState(prev => ({...prev, nickname: e}))} />
            </div>
           
            <div className="pb-3  s-w-80">
                <TextInput 
                    icon="bi-person-fill"
                    tooltipContent="Name reuired to login to account."
                    validation={loginState.validationResult}
                    placeholder="Username"
                    value={loginState.login}
                    changeValue={e => setLoginState(prev => ({...prev, login: e}))} />
            </div>
          
            <div className="pb-3  s-w-80">
                <TextInput 
                    icon="bi-shield-lock-fill"
                    placeholder="Password"
                    value={passwordState.password}
                    validation={passwordState.validationResult}
                    textType={TextType.Password}
                    changeValue={e => setPasswordState(prev => ({...prev, password: e}))} />
            </div>
          
            <div className="d-flex w-100 justify-content-center pt-3">
                <Button 
                    title="Create"
                    size={Size.Large}
                    icon="bi-plus-lg"
                    onClick={e => signInToSimplify()} 
                />
            </div>
           
            <div className="position-absolute bottom-0 start-0 pb-2 ps-2">
                <Button 
                    size={Size.XLarge}
                    style={Style.Borderless}
                    role={Role.Normal}
                    icon="bi-arrow-left"
                    onClick={() => {props.setDisplayLogin(true)}} />
            </div>

        </form>
    )
}   
import React, {useContext, useEffect, useRef, useState} from "react";
import SecureLogin from "../../../assets/img/secure_login.svg"
import { Link, useNavigate } from 'react-router-dom';
import { Global, UserContext } from "../../../context/ContextsIndex";
import { BgColor, Destination, destinationPaths, FontColor, Fonts } from "../../../utils/UtilsIndex";
import { LoginService } from "../services/LoginService"
import { AuthProperties } from "../data/Index"
import { Button, SimpleTextInput, TextType, TextTypes } from "../../../components/ComponentsIndex";
import {useAlert, useNavigateTo} from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { Role, Size, Style } from "../../../components/common/button/ButtonProps";
import { TextInput } from "../../../components/form/text-input/TextInput";
import { AxiosError } from "axios";
import { ValidationResult } from "../../../components/form/shared/SharedProps";
import { AccountService } from "../../account-settings/service/AccountService";
import { Start } from '../../../pages/Start';
import { BacklogService, SprintService } from "../../../services/CommonServicesIndex";
import { ExtendedStatus } from "../../backlog/data/State";


interface LoginNameState {
    login: string,
    validationResult: ValidationResult
}

interface PasswordState {
    password: string,
    validationResult: ValidationResult
}


 
export default function LoginForm(props: AuthProperties){
    const [loginState, setLoginState] = useState<LoginNameState>({login: '', validationResult: {isValid: true, message: ""}})
    const [passwordState, setPasswordState] = useState<PasswordState>({password: '', validationResult: {isValid: true, message: ""}})
    const {settings, setSettings} = useContext(UserContext) as Global 
    const navigate = useNavigateTo()
    const showAlert = useAlert();
    
   
    useEffect(() => {
        setSettings({...settings, isInStartupScreen: true })
    }, [])

    const validateLogin = () => {
        const loginName = loginState.login

        if(loginName.length == 0){
            setLoginState(prev => ({...prev, validationResult:{isValid: false, message: "You need to provide a login."}}))
            return false
        }

        setLoginState(prev => ({...prev,  validationResult: {isValid: true, message: ""}}))
        return true
    }

    const validatePassword = () => {
        const password = passwordState.password

        if(password.length == 0){
            setPasswordState(prev => ({...prev, validationResult:{isValid: false, message: "You need to provide a password."}}))
            return false
        }

        setPasswordState(prev => ({...prev,  validationResult: {isValid: true, message: ""}}))
        return true
    }

    const loginToSimplify =  async () => {
        const loginIsValid = validateLogin()
        const passwordIsValid = validatePassword()
        if(!loginIsValid || !passwordIsValid ) return
        

        try {
            const response = await LoginService.login(loginState.login, passwordState.password)
            if(response.status == 200){

                LoginService.isAdminRole()
                    .then(() =>  setSettings({...settings, isAdmin: true}))
                    .catch(() => setSettings({...settings, isAdmin: false}));
                
                const user = await AccountService.getInfo()
                const sprint = await BacklogService.getSprintInfo()
              
                if(sprint != null){
                    setSettings({...settings, sprintActive: true})
                }

                const project = (await BacklogService.getProjects()).filter(p => p.isActive)
                if(project.length != 0){
                    const backlog = await BacklogService.getFeaturesWithStatusForProject(project[0].guid, ExtendedStatus.ReadyForRefinement)
                    setSettings({...settings, refinementActive: true})
                } 


                if(user.newUser == true){
                    navigate(Destination.Start)
                } else {
                    navigate(Destination.Main)
                }
            }
        } catch(error: any) {
            if (error.isAxiosError) {
                showAlert(AlertStyle.Danger, error.response?.data)
            }

            console.log(error)
        }
    }

    return (
        <form onSubmit={e => {e.preventDefault()}} className="position-relative d-flex flex-column w-100 h-100  justify-content-center align-items-center ps-2 pe-2  s-form-transition" style={{padding: 50}}>
            <div className="pb-3 s-w-80">
                <TextInput 
                    placeholder="Login"
                    icon="bi-person"
                    value={loginState.login} 
                    validation={loginState.validationResult}
                    changeValue={e => {setLoginState(prev => ({...prev, login:e}))}} />
            </div>

            <div className="pb-3 pt-1 s-w-80">
                <TextInput
                    placeholder="Password"
                    icon="bi-shield-lock-fill"
                    value={passwordState.password} 
                    validation={passwordState.validationResult}
                    textType={TextType.Password}
                    changeValue={e => {setPasswordState(prev => ({...prev, password: e}))}} />
            </div>

            <div className="pt-4 d-flex w-100 justify-content-center">
                <Button 
                    size={Size.Large}
                    style={Style.Filled}
                    role={Role.Normal}
                    icon="bi-key"
                    title="Login"
                    onClick={() => {loginToSimplify()}} />
            </div>
            
            <div className="position-absolute bottom-0 start-0 pb-2 ps-2">
                <Button 
                    size={Size.XLarge}
                    style={Style.Borderless}
                    role={Role.Normal}
                    icon="bi-person-fill-add"
                    onClick={() => {props.setDisplayLogin(false)}} />
            </div>
        </form>
    )
}
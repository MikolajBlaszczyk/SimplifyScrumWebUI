import React, {useContext, useEffect, useState} from "react";
import SecureLogin from "../../../assets/img/secure_login.svg"
import { Link, useNavigate } from 'react-router-dom';
import { Global, UserContext } from "../../../context/ContextsIndex";
import { Destination, destinationPaths, Fonts } from "../../../utils/UtilsIndex";
import { LoginService } from "../services/LoginService"
import { AuthProperties } from "../data/Index"
import { Button, Color,  SimpleButton, SimpleTextInput, TextType } from "../../../components/ComponentsIndex";
import {useAlert} from "../../../hooks/HooksIndex";
import { AlertType } from "../../alerting/components/Alert";
 
export default function LoginForm(props: AuthProperties){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {settings, setSettings} = useContext(UserContext) as Global 
    const navigate = useNavigate()
    const showAlert = useAlert();

    useEffect(() => {
        setSettings({...settings, isInStartupScreen: true })
    }, [])


    const loginToSimplify =  async () => {
        
        try {
            const response = await LoginService.login(login, password)
            if(response.status == 200){

                LoginService.isAdminRole()
                    .then(data =>  setSettings({...settings, isAdmin: data}));
                
                const path = destinationPaths[Destination.Main]
                navigate(path)
                
            }
        } catch(error) {
            showAlert(AlertType.Danger, (error as Error).message)
        }
    }

    return (
        <form onSubmit={e => {e.preventDefault()}} className="d-flex flex-column w-100 h-100  ps-2 pe-2  s-form-transition" style={{padding: 50}}>
            <div className="pb-3">
                <SimpleTextInput 
                    label="Login"
                    placeholder="username"
                    value={login} 
                    changeValue={e => {setLogin(e.target.value)}} />
            </div>

            <div className="pb-3 pt-1">
                <SimpleTextInput 
                    label="Password"
                    type={TextType.Password}
                    placeholder="**********"
                    value={password}
                    changeValue={e => {setPassword(e.target.value)}}
                    />
            </div>

            <div className="pt-4 d-flex w-100 justify-content-center">
                <SimpleButton
                    type={Button.Dark}
                    fontColor={Color.Light}
                    font={Fonts.P}
                    title={"Login"}
                    icon="bi-arrow-right"
                    iconOnTheRight={true}
                    onClick={e => {loginToSimplify()}} />
            </div>
            
            <div className="pt-3 d-flex w-100 justify-content-center">
                <SimpleButton 
                    type={Button.Underlined}
                    title="Create account"
                    font={Fonts.Small}
                    onClick={(e => {props.setDisplayLogin(false)})}/>
            </div>
        </form>
    )
}
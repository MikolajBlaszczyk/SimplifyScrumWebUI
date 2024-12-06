import React, {useContext, useEffect, useState} from "react";
import { Global, UserContext } from "../../../context/ContextsIndex";
import { AuthProperties } from "../data/Index";
import { LoginService } from "../services/LoginService"
import { Button, Color, SimpleButton, SimpleTextInput, TextType } from "../../../components/ComponentsIndex";
import { BgColor, FontColor, Fonts } from "../../../utils/UtilsIndex";

const textInputs = 200
const buttonInputs = 100
const thirdPartyProviderFontSize = 12

export default function SignInForm(props: AuthProperties){
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {settings, setSettings} = useContext(UserContext) as Global

    useEffect(() => {
        setSettings({...settings, isInStartupScreen: true})
    }, [])

    const signInToSimplify = async () => {
        // confirm email handling

        LoginService.signIn(login, password, email, nickname, 0)
        props.setDisplayLogin(true)
    }

    return (
        <form onSubmit={e => {e.preventDefault()}} className="d-flex flex-column w-100 h-100 justify-content-center align-items-center  ps-2 pe-2 s-form-transition" style={{padding: 50}}>
            <div className="pb-3 s-w-80">
                <SimpleTextInput 
                    label="Email"
                    color={BgColor.Dark}
                    fontcolor={FontColor.Dark}
                    icon="bi-at"
                    placeholder="example@3ds.com"
                    value={email} 
                    type={TextType.Email}
                    changeValue={e => setEmail(e.target.value)}/>
            </div>  
        
            <div className="pb-3  s-w-80">
                <SimpleTextInput
                    color={BgColor.Dark}
                    fontcolor={FontColor.Dark}
                    icon="bi-alphabet"
                    label="Nickname"
                    placeholder="user48"
                    value={nickname}
                    changeValue={e => setNickname(e.target.value)}/>
            </div>
           
            <div className="pb-3  s-w-80">
                <SimpleTextInput 
                    color={BgColor.Dark}
                    fontcolor={FontColor.Dark}
                    icon="bi-person"
                    label="Username"
                    placeholder="UserLogin48"
                    value={login}
                    changeValue={e => setLogin(e.target.value)}/>
            </div>
          
            <div className="pb-3  s-w-80">
                <SimpleTextInput 
                    color={BgColor.Dark}
                    fontcolor={FontColor.Dark}
                    icon="bi-eye"
                    label="Password"
                    placeholder="**********"
                    value={password}
                    changeValue={e => setPassword(e.target.value)}/>
            </div>
          
            <div className="d-flex w-100 justify-content-center pt-3">
                <SimpleButton 
                    type={Button.Dark} 
                    fontColor={Color.Light}
                    font={Fonts.H6}
                    title={"Create"} 
                    iconOnTheRight={false}
                    icon="bi-plus-lg"
                    onClick={e => signInToSimplify()}/>
            </div>
           
            <div className="pt-3 d-flex w-100 justify-content-center">
                <SimpleButton 
                    type={Button.Underlined}
                    title=""
                    icon="bi-arrow-left"
                    font={Fonts.H6}
                    onClick={(e => {props.setDisplayLogin(true)})}/>
            </div>

        </form>
    )
}   
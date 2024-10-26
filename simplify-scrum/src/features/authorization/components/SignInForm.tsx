import React, {useContext, useEffect, useState} from "react";
import { Global, UserContext } from "../../../context/Index";
import { AuthProperties } from "../data/Index";
import { LoginService } from "../services/LoginService"

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
        <form onSubmit={e => {e.preventDefault()}} className="d-flex flex-column align-items-center border p-4 rounded shadow ">
            <label className="form-label text-light fs-2">Account Info</label>

            <div className="d-flex flex-column input-group-sm mt-2 w-100">
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} type="email" style={{width: textInputs}} placeholder="email"/>
                <input className="form-control mt-1" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} type="email" style={{width: textInputs}} placeholder="confirm email"/>
                <input className="form-control mt-1" value={nickname} onChange={e => setNickname(e.target.value)} type="text" style={{width: textInputs}} placeholder="nickname"/>
                <input className="form-control mt-1" value={login} onChange={e => setLogin(e.target.value)} type="text" style={{width: textInputs}} placeholder="login"/>
                <input className="form-control mt-1" value={password} onChange={e => setPassword(e.target.value)} type="password" style={{width: textInputs}} placeholder="password"/>
            
            </div>

            <div className="btn-group btn-group-sm d-flex flex-column mt-4 mb-3">
                <button className="btn btn-light" onClick={signInToSimplify} style={{width: buttonInputs}}>Sign In</button>
            </div>     

            <hr className="border border-light opacity-25 w-100 mt-3" />

            <div className="d-flex flex-row w-100 justify-content-center mt-2 ">
                <button className="btn btn-outline-light me-3" style={{fontSize: thirdPartyProviderFontSize}}>
                    <i className="bi bi-google"></i>
                </button>
                <button className="btn btn-outline-light ms-3" style={{fontSize: thirdPartyProviderFontSize}}>
                    <i className="bi bi-apple"></i>    
                </button>
            </div>


        </form>
    )
}   
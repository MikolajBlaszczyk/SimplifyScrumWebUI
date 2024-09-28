import { SetStateAction, useState } from "react"
import LoginForm from "./LoginForm"
import SignInForm from "./SignInForm"

export function AuthForm(){
    const [displayLogin, setDisplayLogin] = useState(true)
    
    const form = displayLogin == true ? <LoginForm  setDisplayLogin={setDisplayLogin} /> : <SignInForm setDisplayLogin={setDisplayLogin}/>

    return(
        form
    )
}
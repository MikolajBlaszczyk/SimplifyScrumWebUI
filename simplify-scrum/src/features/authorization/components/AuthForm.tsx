import { SetStateAction, useState } from "react"
import LoginForm from "./LoginForm"
import SecureLogin from "../../../assets/img/secure_login.svg"
import SignInForm from "./SignInForm"

export function AuthForm(){
    const [displayLogin, setDisplayLogin] = useState(true)
    
    const form = displayLogin == true ? <LoginForm  setDisplayLogin={setDisplayLogin} /> : <SignInForm setDisplayLogin={setDisplayLogin}/>

    return(
        <div className="s-central-form row">
            <section className="col s-auth-form">
                {form}
            </section>
            <section className="col s-auth-image d-flex justify-content-center">
                <img src={SecureLogin} className=" img-fluid ms-2 me-2"/>
            </section>
        </div>
    )
}
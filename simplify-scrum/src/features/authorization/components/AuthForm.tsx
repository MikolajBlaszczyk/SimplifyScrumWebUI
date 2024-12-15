import { useState } from "react"
import LoginForm from "./LoginForm"
import SecureLogin from "../../../assets/img/Logo.png"
import SignInForm from "./SignInForm"

export function AuthForm(){
    const [displayLogin, setDisplayLogin] = useState(true)
    
    const form = displayLogin == true ? <LoginForm  setDisplayLogin={setDisplayLogin} /> : <SignInForm setDisplayLogin={setDisplayLogin}/>

    return(
        <div className="d-flex  s-central-form w-50  shadow rounded overflow-hidden rounded">
            <section className="col  s-backgroud-primary s-background-dark-complementary ">
                {form}
            </section>
            <section className="col s-background-dark  d-flex justify-content-center ">
                <img src={SecureLogin} className="img-fluid ms-2 me-2"/>
            </section>
        </div>
    )
}
import React, {useContext, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { GlobalSettings, UserContext } from "../../Utils/Context/UserContext";
import  {SimplifySettings}  from "../../Utils/Context/UserContext";

const textInputs = 200
const buttonInputs = 100
const thirdPartyProviderFontSize = 12

export default function LoginScreen(){
    const {settings, setSettings} = useContext(UserContext) as GlobalSettings 
    const navigate = useNavigate()

    if(settings == null && setSettings == null)
        throw new Error("User context is empty");

    useEffect(() => {
        setSettings({...settings, isInStartupScreen: true })
    }, [])

    const navigateToSignIn = () => {
        navigate("/signin/")
    }

    return (
        <main className="d-flex w-100 h-100 justify-content-center align-items-center bg-dark">
            <form className="d-flex flex-column align-items-center border p-4 rounded shadow ">
                <label className="form-label text-light fs-2">Welcome</label>

                <div className="input-group input-group-sm mt-2 w-100">
                    <input className="form-control" type="text" style={{width: textInputs}} placeholder="email or login"/>
                </div>
                <div className="input-group input-group-sm mt-2 w-100">
                    <input className="form-control" type="password" style={{width: textInputs}} placeholder="password"/>
                </div>


                <div className="btn-group btn-group-sm d-flex flex-column mt-4 mb-3">
                    <button className="btn btn-light " style={{width: buttonInputs}}>Login</button>
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

                <p className="mt-3">
                    <Link
                        className=" link-opacity-25 link-light link-opacity-75-hover link-underline-opacity-0"
                        style={{ fontSize: 10 }} 
                        to={"signin"}>
                        Create account
                    </Link>
                </p>

            </form>
        </main>
    )
}
import React, {useContext} from "react";
import { GlobalSettings, UserContext } from "../../Context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";


export default function NavigationBar(){
    const { settings } = useContext(UserContext) as GlobalSettings
    const navigate = useNavigate()

    const navigateToPreviousPage = () => {
        navigate(-1)
    }

    if(settings == null)
        throw new Error("Global settings are not set")

    return(
        <nav className="navbar bg-dark">
            <div className=" container-fluid">
                <button onClick={() => {navigateToPreviousPage()}} className="btn text-light">
                    <i className="bi bi-arrow-left"></i>
                </button>
                
                
                {
                    !settings.isInStartupScreen &&

                    <button className="text-light btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>
                }

                {
                    !settings.isInStartupScreen &&
                    <div className="offcanvas offcanvas-end  text-bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header d-flex justify-content-between">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Scrum</h5>
                            <button type="button" className="btn text-light" data-bs-dismiss="offcanvas">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                }
                
            </div>
        </nav>
    )
}
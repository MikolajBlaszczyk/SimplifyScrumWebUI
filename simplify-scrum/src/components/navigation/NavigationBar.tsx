import React, {useContext} from "react";
import { Global, UserContext } from "../../context/Index";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/StyleIndex.scss";
import { Destination, destinationPaths } from '../../utils/Index';
import { LoginService } from "../../features/authorization/services/LoginService";




export default function NavigationBar(){
    const { settings } = useContext(UserContext) as Global
    const navigate = useNavigate()

    const navigateToPreviousPage = () => {
        navigate(-1)
    }
    
    const navigateTo = (destination: Destination) => {
        const path = destinationPaths[destination]
        navigate(path)
    }

    const logOut = () => {
        const path = destinationPaths[Destination.Auth]

        LoginService.logOut()
        navigate(path)
    }

    if(settings == null)
        throw new Error("Global settings are not set")

    return(
        <nav className="navbar bg-dark bg-dark-darker">
            <div className=" container-fluid">
                <button onClick={() => {navigateToPreviousPage()}} className="btn text-light">
                    <i className="bi bi-arrow-left"></i>
                </button>
                
                
            
                <button className="text-light btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i>
                </button>
            
    
                <div className="offcanvas offcanvas-end  text-bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header d-flex justify-content-between">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Scrum</h5>
                        <button type="button" className="btn btn-close text-light" data-bs-dismiss="offcanvas"></button>
                    </div>
            
                    <div className="offcanvas-body">
                        <div className=" container">
                                <div className="row">
                                    <button onClick={() => navigateTo(Destination.UserSettings)} className="btn btn-secondary">
                                        <i className="bi bi-person"></i>
                                    </button>
                                </div>
                                <div className="row">
                                <button onClick={() => logOut()} className="btn btn-danger">
                                        Log out
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
               
                
            </div>
        </nav>
    )
}
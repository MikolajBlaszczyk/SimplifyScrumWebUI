import { useNavigate } from "react-router-dom"
import { Destination, destinationPaths } from "../../utils/UtilsIndex"
import { LoginService } from "../../features/authorization/services/LoginService"
import { NavigationButton } from "./NavigationButton"
import { useContext } from "react"
import { UserContext } from "../../context/ContextsIndex";
import { useCleanup } from "../../hooks/useCleanup"
import { useNavigateTo } from "../../hooks/HooksIndex"

export function Offcanvas(){
    const {settings, setSettings} = useContext(UserContext)
    const cleanup = useCleanup()
    const navigate = useNavigate()
    const navigateTo = useNavigateTo()
    

    const logOut = () => {
        const path = destinationPaths[Destination.Auth]

        LoginService.logOut()
        cleanup()

        navigate(path)
    }


    return (
    <div className="offcanvas offcanvas-end  s-bg-text" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-body d-flex flex-column justify-content-between">
            <div className="d-flex flex-column align-items-center">
                    <NavigationButton
                        icon={"bi-person"} 
                        title="Settings"
                        onClick={() => navigateTo(Destination.UserSettings)}/>

                    <NavigationButton
                        icon={"bi-info-circle"} 
                        title="Info Center"
                        onClick={() => navigateTo(Destination.Main)}/>   

                    <NavigationButton
                        icon={"bi-calendar-date"} 
                        title="Meetings"
                        onClick={() => navigateTo(Destination.Meetings)}/>

                    <NavigationButton
                        icon={"bi-list-columns-reverse"} 
                        title="Backlog"
                        onClick={() => navigateTo(Destination.Backlog)}/>          

                    <NavigationButton
                        icon={"bi-suit-heart-fill"} 
                        title="Refinement"
                        onClick={() => navigateTo(Destination.Refinement)}/>

                    <NavigationButton
                        icon={"bi-download"} 
                        title="Planning"
                        onClick={() => navigateTo(Destination.Planning)}/>

                    <NavigationButton
                        icon={"bi-puzzle"} 
                        title="Daily"
                        onClick={() => navigateTo(Destination.UserSettings)}/>


                    <NavigationButton
                        icon={"bi-repeat"} 
                        title="Retrospective"
                        onClick={() => navigateTo(Destination.Retrospective)}/>

                    {
                        settings.isAdmin == true &&
                        (
                        <NavigationButton 
                            icon={"bi-battery-charging"} 
                            title="Admin"
                            onClick={() => navigateTo(Destination.Admin)}/>
                        )
                    }

            </div>
            <div className="d-flex flex-column align-items-end s-offcanvas-logout">
                <NavigationButton
                    icon={"bi-exclamation-lg"} 
                    title="Log out"
                    onClick={() => logOut()}/>
            </div>
        </div>
    </div>
    )
}
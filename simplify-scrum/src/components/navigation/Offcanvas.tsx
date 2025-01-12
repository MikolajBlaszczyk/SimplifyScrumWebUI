import { useNavigate } from "react-router-dom"
import { Destination, destinationPaths } from "../../utils/UtilsIndex"
import { LoginService } from "../../features/authorization/services/LoginService"
import { NavigationButton } from "./NavigationButton"
import { MouseEvent, useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/ContextsIndex";
import { useCleanup } from "../../hooks/useCleanup"
import { useNavigateTo } from "../../hooks/HooksIndex"
import logo from '../../assets/img/Logo.png'
import { Button } from "../ComponentsIndex"
import { Role, Size, Style } from "../common/button/ButtonProps"
import { NavigationLabel } from "./NavigationLabel"

interface OffcanvasProps {
    breadcrumbChange: (destination: Destination) => void
}

export function Offcanvas({breadcrumbChange}: OffcanvasProps){
    const {settings, setSettings} = useContext(UserContext)
    const [teamLeaderCenterButton, setTeamLeaderCenterButton] = useState<JSX.Element>(<></>)
    const cleanup = useCleanup()
    const navigate = useNavigate()
    const navigateTo = useNavigateTo()
    
    useEffect(() => {
        if(settings.isAdmin){
            setTeamLeaderCenterButton(<NavigationButton 
                icon={"bi-battery-charging"} 
                title="Admin"
                onClick={() => {
                        breadcrumbChange(Destination.Admin)
                        navigateTo(Destination.Admin)
                    }
                }/>
            )
        } else {
            setTeamLeaderCenterButton(<></>)
        }
    }, [settings.isAdmin])

    const logOut = () => {
        const path = destinationPaths[Destination.Auth]

        LoginService.logOut()
        cleanup()

        navigate(path)
    }


    return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header w-100 align-items-center justify-content-start d-flex ">
            <h4 className="mb-0">Navigation</h4>
        </div>
        <div className="offcanvas-body d-flex flex-column align-items-end justify-content-between">
            <div className="d-flex flex-column align-items-center w-100 ">
                  
                    <NavigationLabel title="Scrum meetings" />

                    <NavigationButton
                        disabled={settings.sprintActive == false}
                        icon={"bi-suit-club"} 
                        title="Refinement"
                        onClick={() => {
                                breadcrumbChange(Destination.Refinement)
                                navigateTo(Destination.Refinement)
                            }
                        }/>

                    <NavigationButton
                        disabled={settings.sprintActive == false}
                        icon={"bi-download"} 
                        title="Planning"
                        onClick={() => {
                                breadcrumbChange(Destination.Planning)
                                navigateTo(Destination.Planning)
                            }
                        }/>

                    <NavigationButton
                        disabled={settings.sprintActive == false}
                        icon={"bi-puzzle"} 
                        title="Daily"
                        onClick={() => {
                                breadcrumbChange(Destination.Daily)
                                navigateTo(Destination.Daily)
                            }
                        }/>

                    <NavigationButton
                        disabled={settings.sprintActive == false}
                        icon={"bi-repeat"} 
                        title="Retrospective"
                        onClick={() => {
                                breadcrumbChange(Destination.Retrospective)
                                navigateTo(Destination.Retrospective)
                            }
                        }/>



                    <div className="mt-4"></div>
                    <NavigationLabel title="Project managemenet" />
                    
                    <NavigationButton
                        icon={"bi-info-circle"} 
                        title="Info Center"
                        onClick={() => {
                                breadcrumbChange(Destination.Main)
                                navigateTo(Destination.Main)
                            }
                        }/>   

                    <NavigationButton
                        icon={"bi-list-columns-reverse"} 
                        title="Backlog"
                        onClick={() => {
                                breadcrumbChange(Destination.Backlog)
                                navigateTo(Destination.Backlog)
                            }
                        }/>        
                   

                    <NavigationButton
                        icon={"bi-calendar-date"} 
                        title="Meetings"
                        onClick={() => {
                                breadcrumbChange(Destination.Meetings)
                                navigateTo(Destination.Meetings)
                            }
                        }/>






                    <div className="mt-4"></div>
                    <NavigationLabel title="User settings" />

                    <NavigationButton
                        icon={"bi-person"} 
                        title="Settings"
                        onClick={() =>{
                                breadcrumbChange(Destination.UserSettings)
                                navigateTo(Destination.UserSettings)
                            }
                        }/>

                    {
                        teamLeaderCenterButton
                    }

                </div>
                <div className="d-flex mt-5 justify-content-end align-items-end s-offcanvas-logout w-100">


                    <Button 
                        style={Style.Borderless}
                        role={Role.Cancel}
                        size={Size.XLarge}
                        icon="bi-power"
                        onClick={() => logOut()} />

                    
                </div>
        </div>
    </div>
    )
}
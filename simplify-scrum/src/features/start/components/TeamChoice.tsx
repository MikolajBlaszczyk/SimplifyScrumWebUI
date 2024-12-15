import { Button, SimpleIcon } from "../../../components/ComponentsIndex";
import { useAlert, useModal } from "../../../hooks/HooksIndex";
import { Fonts } from "../../../utils/UtilsIndex";
import { JoruneyComponentProps } from "./StartJourney";
import { TeamCreator } from "./TeamCreator";
import { JourneyStep } from '../data/JourneyStep';
import { SetStateAction, useEffect, useState } from "react";
import { AlertStyle } from "../../alerting/components/Alert";
import { AccountService } from "../../account-settings/service/AccountService";
import { Team } from "../../../data/CommonDataIndex";

export function TeamChoice({joruneyState, setJourneyState}: JoruneyComponentProps){
    const showModal = useModal()
    const showAlert = useAlert()
    const [team, setTeam] = useState<Team | null>(null)

    const createTeam = () => {
        
        if(team == null){
            fetchData()
                .then(() => {
                    showModal(
                        (
                            <TeamCreator team={team!}  journeyProps={{joruneyState, setJourneyState}}/>
                        ),
                        "Create Team"
                    )
                })
            
                return
        } 

        showModal(
            (
                <TeamCreator team={team!}  journeyProps={{joruneyState, setJourneyState}}/>
            ),
            "Create Team"
        )
    }

    const askTeamLeaderToJoin = () => {
        showAlert(AlertStyle.Warning, "Not available yet")
    }

    const  fetchData = async () => {
        const currentUser = await AccountService.getInfo()
        const team = await AccountService.getTeam(currentUser.teamGuid)
        setTeam(team)

        if(team != null){
            setJourneyState(prev => ({...prev, done: true}))
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="bg-dark s-settings-section" style={{height: "45vh"}}>
            <div className="row d-flex h-100">
                <div className="col-6 border-end d-flex flex-column align-items-center justify-content-center">
                
                    
                    <SimpleIcon 
                        icon={"bi-person-fill"}
                        font={Fonts.H1}/>
                    
                    <div className="mb-3"></div>

                    {/* <SimpleButton 
                        type={Button.Transparent}
                        fontColor={Color.Light}
                        title={"Create my team"}
                        font={Fonts.H5}
                        onClick={() => {createTeam()}} /> */}

                    
                </div>
                <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                    
                    
                    <SimpleIcon 
                            icon={"bi-people-fill"}
                            font={Fonts.H1}/>

                    <div className="mb-3"></div>

                    {/* <SimpleButton 
                            type={Button.Borderless}
                            fontColor={Color.Light}
                            font={Fonts.H5}
                            title={"Ask team leader to join"}
                            onClick={() => {askTeamLeaderToJoin()}} /> */}
                </div>
            </div>
        </section>
    )
}
import { Button, SimpleIcon } from "../../../components/ComponentsIndex";
import { useAlert, useModal } from "../../../hooks/HooksIndex";
import { Fonts } from "../../../utils/UtilsIndex";
import { JoruneyComponentProps } from "./StartJourney";
import { TeamCreator } from "./TeamCreator";
import { JourneyStep } from '../data/JourneyStep';
import { MouseEvent, SetStateAction, useEffect, useState } from "react";
import { AlertStyle } from "../../alerting/components/Alert";
import { AccountService } from "../../account-settings/service/AccountService";
import { Team } from "../../../data/CommonDataIndex";
import { Role, Size, Style } from "../../../components/common/button/ButtonProps";
import { Select } from "@mui/material";
import { TeamJoiner } from "./TeamJoiner";

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
        showModal(
            (
                <TeamJoiner />
            ),
            "Ask team leader to join"
        )
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
                    

                    <Button 
                        className="mt-3"
                        title={"Create my team"}
                        role={Role.Primary}
                        size={Size.Medium}
                        style={Style.Filled}
                        onClick={() => {createTeam()}}/>

                </div>
                <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                    
                    
                    <SimpleIcon 
                            icon={"bi-people-fill"}
                            font={Fonts.H1}/>

                    <Button 
                        className="mt-3"
                        title={"Ask team leader to join"}
                        role={Role.Primary}
                        size={Size.Medium}
                        style={Style.Filled}
                        onClick={() => {askTeamLeaderToJoin()}}/>
                </div>
            </div>
        </section>
    )
}
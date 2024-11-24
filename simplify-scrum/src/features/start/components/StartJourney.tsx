import { useState } from "react";
import { JourneyStep } from "../data/JourneyStep"
import { WelcomeView } from "./WelcomeView";
import { StartSettings } from "./StartSettings";
import { Progress } from "./Progress";
import { Button, SimpleButton } from "../../../components/ComponentsIndex";
import { TeamChoice } from "./TeamChoice";
import { Destination, Fonts } from "../../../utils/UtilsIndex";
import { StartProject } from "./StartProject";
import { useAlert, useNavigateTo } from "../../../hooks/HooksIndex";
import { AlertType } from "../../alerting/components/Alert";
import { useNavigate } from "react-router-dom";

interface JourneyState {
    done: boolean
    step: JourneyStep
}

export interface JoruneyComponentProps {
    joruneyState: JourneyState,
    setJourneyState: React.Dispatch<React.SetStateAction<JourneyState>>
}


export function StartJourney(){
    const showAlert = useAlert();
    const navigateTo = useNavigateTo()
    const [journeyState, setJourneyState] = useState<JourneyState>({
        done: false,
        step: JourneyStep.Welcome
    });

    const moveNext = () => {
        if(journeyState.step == JourneyStep.Project && journeyState.done == true){
            navigateTo(Destination.Main)
        }

        setJourneyState(actual => {

            if(actual.step != JourneyStep.Welcome){
                if(actual.done == true) {
                    return {done: false, step: (actual.step + 1)}
                } else {
                    showAlert(AlertType.Danger, "You need to provide all necessary informations")
                    return {...actual}
                }

            } else {
                return {done: false, step: (actual.step + 1)}
            }
        })
    }
    const moveBack = () => {
        setJourneyState(actual => ({done: true, step: (actual.step - 1)}))
    }

    const journey = {
        [JourneyStep.Welcome]: (<WelcomeView moveNext={() => moveNext()}/>),
        [JourneyStep.UserSettings]: (<StartSettings joruneyState={journeyState} setJourneyState={setJourneyState} />),
        [JourneyStep.Team]: (<TeamChoice joruneyState={journeyState} setJourneyState={setJourneyState} />),
        [JourneyStep.Project]: (<StartProject />)
        
    }

    return (
        journeyState.step == JourneyStep.Welcome ? 
        (
           journey[journeyState.step]
        ) 
        :
        (
            <main className="d-flex w-100 h-75 justify-content-center align-items-center flex-column">
                {
                    journeyState.step != JourneyStep.UserSettings && 
                    (
                        <div className=" position-absolute start-0 top-0 ">
                            <SimpleButton font={Fonts.H4} type={Button.Borderless} title={""} icon="bi-arrow-left" onClick={() => moveBack()} />
                        </div>
                    )
                }
                <div className="w-50">

                    {journey[journeyState.step]}


                    <div className="mt-5 position-absolute w-50 top-75 start-50 translate-middle mb-10">

                        <Progress step={journeyState.step} />
                        <div className="d-flex w-100 justify-content-center">

                            <SimpleButton 
                                font={Fonts.H6}
                                type={Button.Primary}
                                title={journeyState.step == JourneyStep.Project ? "Finish" : "Click to go next"} 
                                onClick={() => moveNext()} />
                        </div>
                    </div>
                </div>
            </main>
        )
    )

}
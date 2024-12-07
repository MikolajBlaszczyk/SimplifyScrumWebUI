import { useState } from "react";
import { SimpleDateInput, SimpleNumberInput, SimpleTextInput } from "../../../components/ComponentsIndex";
import { BgColor, FontColor } from '../../../utils/colors/Colors';
import { set } from 'date-fns';
import { SprintState } from "./PlannedBoard";



interface Props {
    sprintState: SprintState
    setSprintState: (value: React.SetStateAction<SprintState>) => void
}

export function SprintEdit({sprintState, setSprintState}: Props){

    return (
        <div className="d-flex flex-column w-75">
            <SimpleTextInput
                icon="bi-alphabet" 
                label="Name"
                color={BgColor.DarkSubtle}
                fontcolor={FontColor.Dark}
                value={sprintState.name} 
                changeValue={e => {setSprintState(prev => ({...prev, name: e.target.value}))}}
                                />
            <div className="mb-2"></div>
            <SimpleTextInput
                icon="bi-flag-fill" 
                label="Goal"
                color={BgColor.DarkSubtle}
                fontcolor={FontColor.Dark}
                value={sprintState.goal} 
                changeValue={e => {setSprintState(prev => ({...prev, goal: e.target.value}))}}
                                />
            <div className="mb-2"></div>
            <SimpleNumberInput 
                icon="bi-repeat-1"
                color={BgColor.DarkSubtle}
                fontcolor={FontColor.Dark}
                label="Iteration"
                min={0}
                value={sprintState.iteration }
                changeValue={e => {setSprintState(prev => ({...prev, iteration: parseInt(e.target.value)}))}}
                 />
            <div className="mb-2"></div>
            <SimpleDateInput 
                icon="bi-calendar-event"
                value={sprintState.end}
                onValueChange={e => {setSprintState(prev => ({...prev, end: new Date(e)}))}} 
                label={"End"} />
        </div>
    )
}
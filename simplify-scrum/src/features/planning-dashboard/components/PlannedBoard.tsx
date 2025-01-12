import { MouseEvent, useState } from "react"
import { Feature } from "../../backlog/data/DataIndex"
import { DragableFeature, DragableTypes } from "./DragableFeature";
import { useDrop } from "react-dnd";
import { Button, TextInput } from "../../../components/ComponentsIndex";
import { Plan, SprintModel } from "../../../data/CommonDataIndex";
import { SprintService } from "../../../services/CommonServicesIndex";
import { Role, Style } from "../../../components/common/button/ButtonProps";
import { CalendarInput } from "../../../components/form/calendar/CalendarInput";
import { NumberInput } from "../../../components/form/number-input/NumberInput";
import { CalendarState, NumberState, TextState } from "../../../components/form/shared/SharedProps";
import { useAlert } from "../../../hooks/useAlert";
import { AlertStyle } from "../../alerting/components/Alert";
import { useNavigateTo } from "../../../hooks/useNavigation";
import { Destination } from "../../../utils/UtilsIndex";

export interface SprintState {
    name: string,
    goal: string,
    iteration: number,
    end: Date,
}

interface Props {
    features: Feature[]
    plannedItems: Feature[];
    onDropFeature: (feature: Feature) => void;
    onRemoveFeature: (feature: Feature) => void;
    projectGuid: string
}

export function PlannedBoard({onDropFeature, onRemoveFeature , plannedItems, features, projectGuid}: Props){
    const showAlert = useAlert()
    const navigate = useNavigateTo()
    const [nameState, setNameState] = useState<TextState>({value: "", validation: {isValid: true, message: ""}})
    const [goalState, setGoalState] = useState<TextState>({value: "", validation: {isValid: true, message: ""}})
    const [iterationState, setIterationState] = useState<NumberState>({value: 1, validation: {isValid: true, message: ""}}) 
    const [endState, setEndState] = useState<CalendarState>({date: new Date(new Date().setDate(new Date().getDate() + 7)), validationResult: {isValid: true, message: ""}})


    const [{ isOver }, drop] = useDrop({
        accept: DragableTypes.Feature,
        drop: (item: { id: string }) => {
            const feature = features.find(f => f.guid === item.id);
            if (feature) {
                onDropFeature(feature);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
        });
    
    const isValid = () => {
        let isValid = true;
        if(nameState.value == ""){
            setNameState(prev => ({...prev, validation: {isValid: false, message: "Name is required"}}))
            isValid = false;
        } else {
            setNameState(prev => ({...prev, validation: {isValid: true, message: ""}}))
        }

        if(goalState.value == ""){
            setGoalState(prev => ({...prev, validation: {isValid: false, message: "Goal is required"}}))
            isValid = false;
        } else {
            setGoalState(prev => ({...prev, validation: {isValid: true, message: ""}}))
        }

        if(iterationState.value == 0){
            setIterationState(prev => ({...prev, validation: {isValid: false, message: "Iteration must be greater than 0"}}))
            isValid = false;
        } else {
            setIterationState(prev => ({...prev, validation: {isValid: true, message: ""}}))
        }


        const currentDate = new Date();
        const endDate = endState.date;
        const timeDifference = endDate.getTime() - currentDate.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);
        if(dayDifference < 7){
            setEndState(prev => ({...prev, validationResult: {isValid: false, message: "Sprint need to be at least 7 days long"}}))
            isValid = false;
        } else {
            setEndState(prev => ({...prev, validationResult: {isValid: true, message: ""}}))
        }

        if(plannedItems.length == 0){
            showAlert(AlertStyle.Warning, "No features planned", "You need to plan at least one feature")
        }

        return isValid;
    }
    

    const reset = () => {
        plannedItems.forEach(onRemoveFeature);
        setNameState(prev => ({...prev, value: ""}))
        setGoalState(prev => ({...prev, value: ""}))
        setIterationState(prev => ({...prev, value: 0}))
        setEndState(prev => ({...prev, date: new Date(new Date().setDate(new Date().getDate() + 7))}))
    }

    const plan = async () => {
        if(!isValid()) return;

        const sprint = new SprintModel('', nameState.value, goalState.value, iterationState.value, endState.date, projectGuid)
        const featureGuids = plannedItems.map(feature => feature.guid);

        const sprintPlan: Plan = { sprint: sprint, featureGuids: featureGuids}

        const response = await SprintService.PlanSprint(sprintPlan)
        if(response != null ){
            showAlert(AlertStyle.Success, "Sprint planned", "Sprint has been planned successfully")
            reset()
            navigate(Destination.Main)
        } else {
            showAlert(AlertStyle.Danger, "Sprint planning failed", "Fail")
        }
    }

      
    return (
        <div ref={drop}  className="s-planned-board h-100  border-start border-2   d-flex flex-column w-100 justify-content-between align-items-center">
           <div className="d-flex w-100 flex-column align-items-center justify-content-center h-100  mt-3 mb-3">
             

                {plannedItems.length != 0 && (
                    <div className="d-flex flex-column w-100 p-4 ps-5 pe-5">
                    <h5 > 
                        Plan Sprint
                    </h5>
                    
                    <TextInput 
                        className="mt-2"
                        icon="bi-alphabet" 
                        placeholder="Name"
                        validation={nameState.validation}
                        value={nameState.value} 
                        changeValue={(e) => {
                            setNameState(prev => ({...prev, value: e}))
                        }} />
        
                    <TextInput 
                        className="mt-3"
                        icon="bi-flag-fill"
                        placeholder="Goal"
                        validation={goalState.validation}
                        value={goalState.value} 
                        changeValue={(e) => {
                            setGoalState(prev => ({...prev, value: e}))
                        }} />
        
        
                    <NumberInput 
                        className="mt-3"
                        icon="bi-repeat-1"
                        placeholder="Iteration"
                        min={0}
                        value={iterationState.value.toString()} 
                        changeValue={e =>{
                            setIterationState(prev => ({...prev, value: parseInt(e)}))
                        }} />
        
                     <CalendarInput 
                            icon="bi-calendar"
                            placeholder="Date"
                            className="mt-3 "
                            validation={endState.validationResult}
                            value={new Date(endState.date)} 
                            onValueChange={e => {
                                setEndState(prev => ({...prev, date: new Date(e)}))
                            }} />
                       <div className="d-flex justify-content-between mt-3 w-100 ">
                            <Button 
                                style={Style.Filled}
                                role={Role.Destructive}
                                title={"Reset"}
                                onClick={e => { reset()} } />
        
                            <Button 
                                style={Style.Filled}
                                role={Role.Primary}
                                title={"Plan"}
                                onClick={e => { plan()} } />
                        
                        </div>
                </div>
                ) }
           </div>
           
            {plannedItems.length == 0 ? (
                <div className="s-planned-board-placeholder ">
                    <div className=" d-flex flex-column justify-content-center align-items-center w-50  text-center p-2 ">
                        <i className="bi bi-dropbox s-h3"></i>
                        <h6>
                            Drag and drop features to the sprint 
                        </h6>
                        
                    </div>
               
                </div>
            ) : (
            
                      
                <div className="d-flex flex-column align-items-center w-100 h-100 " style={{ flexGrow: 1 }}>
                    <h5 className="ps-5 align-self-start mb-3" > 
                        Planned features
                    </h5>
                    {plannedItems.map(feature => <DragableFeature feature={feature} setFeatures={onRemoveFeature} /> )}
                </div>
                
            
               
            )}
            
        </div>
    )
}
import { MouseEvent, useState } from "react"
import { Feature } from "../../backlog/data/DataIndex"
import { DragableFeature, DragableTypes } from "./DragableFeature";
import { useDrop } from "react-dnd";
import { Button } from "../../../components/ComponentsIndex";
import { Fonts } from "../../../utils/UtilsIndex";
import { SprintEdit } from "./SprintEdit";
import { Plan, SprintModel } from "../../../data/CommonDataIndex";
import { PlanningService } from "../../../services/CommonServicesIndex";

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
    const [sprintState, setSprintState] = useState<SprintState>({name: '', goal: '', iteration: 0, end: new Date()})

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

    const reset = () => {
        plannedItems.forEach(onRemoveFeature);
        setSprintState({name: '', goal: '', iteration: 0, end: new Date()})
    }

    const plan = async () => {
        const sprint = new SprintModel('', sprintState.name, sprintState.goal, sprintState.iteration, sprintState.end, projectGuid)
        const featureGuids = plannedItems.map(feature => feature.guid);

        const sprintPlan: Plan = { sprint: sprint, featureGuids: featureGuids}

        const response = await PlanningService.PlanSprint(sprintPlan)
        console.log(response)
    }

      
    return (
        <div ref={drop}  className="s-planned-board h-auto  rounded shadow d-flex flex-column w-100 bg-dark justify-content-between align-items-center">
           <div className="d-flex w-100 flex-column align-items-center justify-content-center  mt-3 mb-3">
                <h3 className="mb-3"> 
                    Sprint no. 1
                </h3>

                {plannedItems.length != 0 && <SprintEdit sprintState={sprintState} setSprintState= {setSprintState} /> }
           </div>
           
            {plannedItems.length == 0 ? (
                <div className="s-planned-board-placeholder">
                    <div className=" d-flex flex-column justify-content-center align-items-center w-50 text-center p-2 ">
                        <i className="bi bi-dropbox s-h3"></i>
                        <h6>
                            Drag and drop features to the sprint 
                        </h6>
                        
                    </div>
               
                </div>
            ) : (
                <>
                      
                    <div className="d-flex flex-column align-items-center w-100 h-100 overflow-auto" style={{ flexGrow: 1 }}>
                        {plannedItems.map(feature => <DragableFeature feature={feature} setFeatures={onRemoveFeature} /> )}
                    </div>
                    <div className="d-flex justify-content-between mb-5 w-75 ">
                    {/* <SimpleButton 
                            type={Button.Danger}
                            font={Fonts.H5}
                            title={"Reset"}
                            onClick={e => { reset()}}/>
                        
                        <SimpleButton 
                            type={Button.Success}
                            font={Fonts.H5}
                            title={"Save"}
                            onClick={e => {plan()}}/> */}
                    </div>
                </>
               
            )}
            
        </div>
    )
}
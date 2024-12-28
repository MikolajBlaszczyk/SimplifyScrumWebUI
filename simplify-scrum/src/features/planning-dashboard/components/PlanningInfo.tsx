import { MouseEvent, useEffect, useState } from "react"
import { Project } from "../../backlog/data/Project";
import { Button, Placeholder } from "../../../components/ComponentsIndex";
import { DragableFeatureBoard } from "./DragableFeatureBoard";
import { Feature } from "../../backlog/data/DataIndex";

interface Props {
    features: Feature[]
    plannedItems: Feature[];
    onDropFeature: (feature: Feature) => void;
    onRemoveFeature: (feature: Feature) => void;
    project: Project
    isLoading: boolean
    isEmpty: boolean
}

export function PlanningInfo({project, isLoading, isEmpty, plannedItems, features, onDropFeature, onRemoveFeature }: Props){ 
  
    if(isLoading == true){
        return (
            <div className="d-flex p-3 w-75 bg-dark rounded justify-content-center align-items-center opacity-75">
                <Placeholder />
            </div>
            )
    }


    return (
        <div className="d-flex p-3 scrollbar-left  w-100 bg-dark s-refined-feature-list h-100 flex-column ">
            <div className="d-flex mt-4 justify-content-center w-100">
                <h5 className="">
                    {isEmpty ? "No features ready to plan": `Project: ${project.name}`}
                </h5>
            </div>

            <DragableFeatureBoard features={features}  plannedItems={plannedItems} onDropFeature={onDropFeature} onRemoveFeature={onRemoveFeature} />

          
        </div>
    )
}
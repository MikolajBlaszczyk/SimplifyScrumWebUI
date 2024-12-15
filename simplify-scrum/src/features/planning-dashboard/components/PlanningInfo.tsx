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
            <div className="d-flex p-3 h-100 w-75 bg-dark rounded justify-content-center align-items-center opacity-75">
                <Placeholder />
            </div>
            )
    }


    return (
        <div className="d-flex p-3 h-100 w-75 bg-dark rounded flex-column ">
            <div className="d-flex mb-4 justify-content-center w-100  border-bottom  border-3">
                <h3 className="">
                    {isEmpty ? "User is not in any project.": `Project: ${project.name}`}
                </h3>
            </div>

            <DragableFeatureBoard features={features}  plannedItems={plannedItems} onDropFeature={onDropFeature} onRemoveFeature={onRemoveFeature} />

          
        </div>
    )
}
import { useEffect, useState } from "react";
import { BacklogService, SprintService } from "../services/CommonServicesIndex";
import { DragableFeatureBoard } from "../features/planning-dashboard/components/DragableFeatureBoard";
import { PlannedBoard } from "../features/planning-dashboard/components/PlannedBoard";
import { Alignment, CentralLayout, SideBySideLayout } from "../layouts/LayoutIndex";
import { ExtendedStatus, Feature, Project } from "../features/backlog/data/DataIndex";
import { PlanningInfo } from "../features/planning-dashboard/components/PlanningInfo";
import { DataLoader } from "../data/CommonDataIndex";
import { SplitLayout } from "../layouts/SplitLayout";

export function Planning(){
    const [projectLoader, setProjectLoader] =   useState<DataLoader>(DataLoader.default())
    const [plannedItems, setPlannedItems] = useState<Feature[]>([]);
    const [features, setFeatures] = useState<Feature[]>([])

    const fetchData = async () => {
        const project =  await SprintService.getCurrentProject()    
        if(project) {
            setProjectLoader(DataLoader.dataFinishedLoading(projectLoader, project, false))
            const features = await BacklogService.getFeaturesWithStatusForProject(project.guid, ExtendedStatus.Refined);
            setFeatures(features)
        } else {
            setProjectLoader(DataLoader.dataFinishedLoading(projectLoader, project, true))
            setFeatures([])
        }

       
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDropFeature = (feature: Feature) => {
        setPlannedItems(prev => [...prev, feature]);
        setFeatures(prev => prev.filter(f => f.guid !== feature.guid));
    };

    const handleRemoveFeature = (feature: Feature) => {
        setFeatures(prev => [...prev, feature]);
        setPlannedItems(prev => prev.filter(f => f.guid !== feature.guid));
    };


    return (
        <CentralLayout 
            centralComponent={ 
                <SplitLayout 
                    title={"Planning"} 
                    leftContent={<PlanningInfo 
                        features={features}
                        isEmpty={projectLoader.isEmpty}
                        isLoading={projectLoader.placeholder}
                        project={projectLoader.data}
                        plannedItems={plannedItems} 
                        onDropFeature={handleDropFeature} 
                        onRemoveFeature={handleRemoveFeature}  />}
                    rightContent={ <PlannedBoard 
                        features={features}
                        projectGuid={projectLoader.data != null ? (projectLoader.data as Project).guid : ""} 
                        plannedItems={plannedItems} 
                        onDropFeature={handleDropFeature} 
                        onRemoveFeature={handleRemoveFeature} />}
                       />
                }
        />
       
    )
}
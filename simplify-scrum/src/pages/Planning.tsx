import { useEffect, useState } from "react";
import { BacklogService } from "../services/CommonServicesIndex";
import { DragableFeatureBoard } from "../features/planning-dashboard/components/DragableFeatureBoard";
import { PlannedBoard } from "../features/planning-dashboard/components/PlannedBoard";
import { Alignment, CentralLayout, SideBySideLayout } from "../layouts/LayoutIndex";
import { Feature } from "../features/backlog/data/DataIndex";

export function Planning(){
    const [features, setFeatures] = useState<Feature[]>([])

    useEffect(() => {
    }, [])

    return (
        <CentralLayout 
            centralComponent={ 
                <SideBySideLayout
                    rightSide={<PlannedBoard features={features} />}
                    leftSide={<DragableFeatureBoard intialFeatures={features} />} 
                    alignment={Alignment.Equal}/>
                }
        />
       
    )
}
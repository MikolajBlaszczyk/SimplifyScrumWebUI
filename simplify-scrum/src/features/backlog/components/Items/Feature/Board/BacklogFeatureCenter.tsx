import { useEffect, useState } from "react";
import { DataLoader } from "../../../../../../data/CommonDataIndex";
import { FeatureBoard } from "./FeatureBoard";
import { BacklogService } from "../../../../../../services/CommonServicesIndex";
import { useBacklog } from "../../../../../../hooks/useContexts";


export function BacklogFeatureCenter() {
    const {state, setState} = useBacklog()
    const [featuresLoader, setFeaturesLoader] = useState<DataLoader>(DataLoader.default())

    const fetchData = async () => {
        const features = await BacklogService.getFeaturesForProject(state.parentGuid)
        if(features.length == 0){
            setFeaturesLoader(prev => DataLoader.dataFinishedLoading(prev, features, true))
        }
        else{
            setFeaturesLoader(prev => DataLoader.dataFinishedLoading(prev, features, false))
        }           
    }

    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <FeatureBoard isEmpty={featuresLoader.isEmpty} placeholder={featuresLoader.placeholder} features={featuresLoader.data} />
    )
}
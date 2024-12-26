import { useEffect, useState } from "react";

import { CentralLayout } from "../layouts/CentralLayout";
import { BacklogProjectCenter } from "../features/backlog/components/Items/Project/Board/BacklogProjectCenter";
import { useBacklog } from "../hooks/HooksIndex";
import { BacklogAction } from '../context/BacklogContext';
import { BacklogFeatureCenter } from "../features/backlog/components/Items/Feature/Board/BacklogFeatureCenter";

export function Backlog(){
    const {state, setState} = useBacklog()
    const [centralComponent, setCentralComponent] = useState(<BacklogProjectCenter />)
    
    useEffect(() => {

        switch(state.action) { 

            case BacklogAction.ShowProjects: 
            case BacklogAction.AddProject: 
            case BacklogAction.EditProject: 
                setCentralComponent(<BacklogProjectCenter />)
                break;
            case BacklogAction.ShowFeatures:
            case BacklogAction.EditFeature:
            case BacklogAction.AddFeature:
                setCentralComponent(<BacklogFeatureCenter />)
                break;

        }


    }, [state.action])

    return (
            <CentralLayout 
                centralComponent={centralComponent}/>
        )
}
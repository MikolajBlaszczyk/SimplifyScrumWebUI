import { ReactElement, useEffect, useMemo, useState } from "react";
import { Board, BoardType } from "../features/backlog/components/board/Board";
import { ProjectCard } from "../features/backlog/components/utils/ProjectCard";
import { Project } from "../features/backlog/data/DataIndex";

import { CentralLayout } from "../layouts/CentralLayout";
import { BacklogService } from "../services/CommonServicesIndex";
import { BacklogProjectCenter } from "../features/backlog/components/Items/Project/Board/BacklogProjectCenter";
import { useBacklog } from "../hooks/HooksIndex";
import { BacklogAction, BacklogStateProvider } from '../context/BacklogContext';
import { DetailBoard, DetailType } from "../features/backlog/components/board/DetailBoard";
import { BacklogFeatureCenter } from "../features/backlog/components/Items/Feature/Board/BacklogFeatureCenter";

export function Backlog(){
    const {state, setState} = useBacklog()
    
    const [centralComponent, setCentralComponent] = useState(<BacklogProjectCenter />)
    
    useEffect(() => {

        switch(state.action) { 

            case BacklogAction.ShowProjects: 
                setCentralComponent(<BacklogProjectCenter />)
                break;
            case BacklogAction.AddProject: 
                setCentralComponent(<DetailBoard title="New Project" type={DetailType.Project} />)
                break;
            case BacklogAction.EditProject: 
                setCentralComponent(<DetailBoard title="Edit Project" type={DetailType.Project} guid={state.guid}/>)
                break;
            case BacklogAction.ShowFeatures:
                setCentralComponent(<BacklogFeatureCenter />)
                break;
            case BacklogAction.EditFeature:
                setCentralComponent(<DetailBoard title="New Feature" type={DetailType.Feature} guid={state.guid} parentGuid={state.parentGuid}/>)
                break;
        }


    }, [state.action])

    return (
            <CentralLayout 
                centralComponent={centralComponent}/>
        )
}
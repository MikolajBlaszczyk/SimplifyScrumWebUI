import { useEffect, useState } from "react";
import { RefinementDashboard } from "../features/refinement-dashboard/components/board/RefinementDashboard";
import { useRefinement } from "../hooks/useContexts";
import { CentralLayout } from "../layouts/CentralLayout";
import { RefinementAction } from "../context/ContextsIndex";
import { RefinementFeatureInfo } from '../features/refinement-dashboard/components/info/RefinementFeatureInfo';
import FeatureEdit from "../features/backlog/components/Items/Feature/Edit/FeatureEdit";
import { RefinementEdit } from "../features/refinement-dashboard/components/edit/RefinementEdit";

export function Refinement(){
    const { state, setState } = useRefinement()
    const [centralComponent, setCentralComponent] = useState(<RefinementDashboard />)


    useEffect(() => {

        switch(state.action) { 

           case RefinementAction.ShowItems:
                setCentralComponent(<RefinementDashboard />)
                break;
            case RefinementAction.Refine:
                setCentralComponent(<RefinementFeatureInfo guid={state.itemGuid} />)
                break;
            case RefinementAction.EditItem:
                setCentralComponent(<RefinementEdit  /> )
                break;
        }


    }, [state.action])

    return(
        <CentralLayout
            centralComponent={centralComponent} />
        )
}
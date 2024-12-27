import { useEffect, useMemo, useState } from "react";
import { RefinementDashboard } from "../features/refinement-dashboard/components/board/RefinementDashboard";
import { useRefinement } from "../hooks/useContexts";
import { CentralLayout } from "../layouts/CentralLayout";
import { RefinementAction } from "../context/ContextsIndex";
import { RefinementFeatureInfo } from '../features/refinement-dashboard/components/info/RefinementFeatureInfo';
import { StandardHeader, StandardHeaderProps, TabButtonsConfiguration } from "../components/ComponentsIndex";

export function Refinement(){
    const { state, setState } = useRefinement()
    const [centralComponent, setCentralComponent] = useState(<RefinementDashboard />)
    const [activeButton, setActiveButton] = useState(0)
    
    const headerConfig: StandardHeaderProps = useMemo(() => {
            if(state.action == RefinementAction.ShowItems) setActiveButton(0)
            if(state.action == RefinementAction.Refine) setActiveButton(1)
           
            const buttons: TabButtonsConfiguration[] = [
                {
                    icon: "bi-card-list",
                    onClick: () => { 
                        setState({...state, action: RefinementAction.ShowItems})
                    }
                },
                {
                    icon: "bi-file-easel",
                    disabled: !(activeButton === 1),
                    onClick: () => {
                        setState({...state, action: RefinementAction.Refine})
                    }
                },
            ]
    
            buttons.forEach((button, index) => { if(activeButton == index) button.isActive = true })
    
            return ({ title: "Features", buttonConfigs: buttons})
        }, [state.action, activeButton])

    useEffect(() => {

        switch(state.action) { 

           case RefinementAction.ShowItems:
                setCentralComponent(<RefinementDashboard />)
                break;
            case RefinementAction.Refine:
                setCentralComponent(<RefinementFeatureInfo guid={state.itemGuid} />)
                break;
           
        }

    }, [state.action])

    return(
        <CentralLayout
            centralComponent={
                <div className="d-flex flex-column s-bg-dark s-refinement-board rounded  s-w-80">
                <StandardHeader 
                    {...headerConfig}/>
                    {
                        centralComponent
                    }     
                </div>
               
            } />
        )
}
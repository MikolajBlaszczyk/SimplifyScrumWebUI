import { RefinementDashboard } from "../features/refinement-dashboard/components/RefinementDashboard";
import { CentralLayout } from "../layouts/CentralLayout";

export function Refinement(){
    
    return(
        <CentralLayout
            centralComponent={<RefinementDashboard/>} />
        )
}
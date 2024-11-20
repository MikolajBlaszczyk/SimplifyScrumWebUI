import { StartJourney } from "../features/start/components/StartJourney";
import { FullScreenLayout } from "../layouts/FullScreenLayout";
import { BgColor } from "../utils/UtilsIndex";

export function Start(){ 
    return (
    <FullScreenLayout 
        child={
            <FullScreenLayout
                child={<StartJourney />}
                showNavbar={false}/>
            }/>
    )
}
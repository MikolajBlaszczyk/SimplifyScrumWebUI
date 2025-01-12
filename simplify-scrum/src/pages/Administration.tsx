import { UserCard } from "../features/account-settings/components/UserCard";
import { TeamLeaderCenter } from "../features/administration/components/TeamLeaderCenter";
import { CentralLayout } from "../layouts/CentralLayout";
import { FullScreenLayout } from "../layouts/FullScreenLayout";
import { Alignment, SideBySideLayout } from "../layouts/SideBySideLayout";
import { BgColor } from "../utils/UtilsIndex";

export function Administration(){
    return  <FullScreenLayout 
                color={BgColor.Light}
                child={ 
                    <SideBySideLayout
                        rightSide={<div className="d-flex  s-settings-card"> 
                            <UserCard />
                        </div>
                        } 
                        leftSide={<TeamLeaderCenter />} 
                        alignment={Alignment.Equal} />
                }/>
}
import { UserCard } from "../features/account-settings/components/UserCard";
import UserSettingsForm from "../features/account-settings/components/UserSettingsForm";
import { FullScreenLayout } from "../layouts/FullScreenLayout";
import { Alignment, SideBySideLayout } from "../layouts/SideBySideLayout";
import { BgColor } from "../utils/UtilsIndex";

export function Settings(){
    return (
       <FullScreenLayout 
            color={BgColor.Light}
            child={ 
                <SideBySideLayout
                    rightSide={<div className="d-flex s-settings-card mt-5"> 
                        <UserCard />
                    </div>
                    } 
                    leftSide={<UserSettingsForm />} 
                    alignment={Alignment.Equal} />
            }/>
    )
}
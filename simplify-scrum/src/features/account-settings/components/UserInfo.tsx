import { useEffect, useState } from "react"
import { User, Team, Role, UserInfo } from "../../../data/CommonDataIndex"
import { EnumService } from "../../../services/CommonServicesIndex"
import { AccountService } from '../service/AccountService';
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { UserTextSetting } from "./UserSettings";

interface Props {
    user: UserInfo
}

export default function UserInformation({user}: Props) {
    const [manager, setManager] = useState<UserInfo>(User.default())
    const [team, setTeam] = useState<Team>(Team.default())
    const [role, setRole] = useState<Role>(Role.DevelopmentTeam)
    const showAlert = useAlert()

    useEffect(() =>  { 
        try{
            
            setManager(AccountService.getManager())
            AccountService
                .getTeam(user.teamGuid).then(data => setTeam(data))
            setRole(user.role) 
        } catch(error) { 
            showAlert(AlertStyle.Danger, '')
        }
        
    }, [])


    return (
    <section className="mt-5 mb-5 bg-dark s-settings-section">  
        <h4>
            Organization
        </h4> 

        <UserTextSetting 
            icon={"bi-person-fill-up"} 
            label={"Manager"} 
            value={manager.nickname} />
        
        <UserTextSetting 
            icon={"bi-people-fill"} 
            label={"Team"} 
            value={team.name} />
        
        <UserTextSetting 
            icon={"bi-person-fill-gear"} 
            label={"Role"} 
            value={EnumService.convertRoleToString(role)} />
    </section>
    )
}
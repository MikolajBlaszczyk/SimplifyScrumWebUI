import { useEffect, useState } from "react"
import { User, Team, Role, UserInfo } from "../../../data/CommonDataIndex"
import { EnumService } from "../../../services/CommonServicesIndex"
import { AccountService } from '../service/AccountService';
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertType } from "../../alerting/components/Alert";
import { UserSetting } from "./UserSettings";

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
            setTeam(AccountService.getTeam())
            setRole(user.role) 
        } catch(error) { 
            showAlert(AlertType.Danger, '')
        }
        
    }, [])


    return (
    <section className="mt-5 mb-5 bg-dark s-settings-section">  
        <h4>
            Organization
        </h4> 

        <UserSetting 
            icon={"bi-person-fill-up"} 
            label={"Manager"} 
            value={manager.nickname} />
        
        <UserSetting 
            icon={"bi-people-fill"} 
            label={"Team"} 
            value={team.name} />
        
        <UserSetting 
            icon={"bi-person-fill-gear"} 
            label={"Role"} 
            value={EnumService.convertRoleToString(role)} />
    </section>
    )
}
import { useEffect, useState } from "react"
import { SimpleTextInput } from "../../../components/ComponentsIndex"
import { User, Team, Role, UserInfo } from "../../../data/DataIndex"
import { EnumService } from "../../backlog/service/ServiceIndex"
import { AccountService } from '../service/AccountService';

interface Props {
    user: UserInfo
}

export default function UserInformation({user}: Props) {
    const [manager, setManager] = useState<UserInfo>(User.default())
    const [team, setTeam] = useState<Team>(Team.default())
    const [role, setRole] = useState<Role>(Role.DevelopmentTeam)

    useEffect(() =>  { 
        setManager(AccountService.getManager())
        setTeam(AccountService.getTeam())
        setRole(user.role) 
    }, [])


    return (
    <section>  
        <SimpleTextInput
            label="Manager"
            value={manager.nickname} 
            changeValue={e => {}} 
            readonly={true}/>
        <SimpleTextInput 
            label="Team"
            value={team.name}
            changeValue={e => {}}
            readonly/>
        <SimpleTextInput 
            label="Role"
            value={EnumService.convertRoleToString(role)}
            changeValue={e => {}}
            readonly />
    </section>
    )
}
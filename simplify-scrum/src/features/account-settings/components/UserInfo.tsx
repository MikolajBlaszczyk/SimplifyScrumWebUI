import { useEffect, useState } from "react"
import { User, Team, Role, ExtendedDataLoader } from "../../../data/CommonDataIndex"
import { EnumService } from "../../../services/CommonServicesIndex"
import { AccountService } from '../service/AccountService';
import { useAlert } from "../../../hooks/HooksIndex";
import { AlertStyle } from "../../alerting/components/Alert";
import { StandardList, TextInput } from "../../../components/ComponentsIndex";


export default function UserInformation() {
    const [managerLoader, setManagerLoader] = useState<ExtendedDataLoader<User>>(ExtendedDataLoader.default())
    const [teamLoader, setTeamLoader] = useState<ExtendedDataLoader<Team>>(ExtendedDataLoader.default())
    const [roleLoader, setRoleLoader] = useState<ExtendedDataLoader<Role>>(ExtendedDataLoader.default())
    const [teamMembersLoader, setTeamMembersLoader] = useState<ExtendedDataLoader<User[]>>(ExtendedDataLoader.default())
    const showAlert = useAlert()

    
    const fetchData = async () => {
    

        const fetchTeam = async () => {
            try {
                const user = await AccountService.getInfo()

                if(user == null){
                    setRoleLoader(ExtendedDataLoader.dataFinishedLoading(roleLoader, null, true))
                    setManagerLoader(ExtendedDataLoader.dataFinishedLoading(managerLoader, null, true))
                    setTeamLoader(ExtendedDataLoader.dataFinishedLoading(teamLoader, null, true))
                    return
                }

                setRoleLoader(ExtendedDataLoader.dataFinishedLoading(roleLoader, user.role, false))

                const team = await AccountService.getTeam(user.teamGuid)

                if(team == null){
                    setTeamLoader(ExtendedDataLoader.dataFinishedLoading(teamLoader, null, true))
                    setManagerLoader(ExtendedDataLoader.dataFinishedLoading(managerLoader, null, true))
                    return
                }   

                setTeamLoader(ExtendedDataLoader.dataFinishedLoading(teamLoader, team, false))

                const users = await AccountService.getTeamMembers()
                if(users != null){
                    setTeamMembersLoader(ExtendedDataLoader.dataFinishedLoading(teamMembersLoader, users, false))
                }  else {
                    setTeamMembersLoader(ExtendedDataLoader.dataFinishedLoading(teamMembersLoader, [], true))
                }
                const manager = users.find(u => u.id == team.managerGUID)

                if(manager != null)
                    setManagerLoader(ExtendedDataLoader.dataFinishedLoading(managerLoader, manager, false))
                else 
                    setManagerLoader(ExtendedDataLoader.dataFinishedLoading(managerLoader, null, true))
                
            } catch(error) {
                showAlert(AlertStyle.Danger, "Could not retrieve team information")
            }
            
        }   

        await fetchTeam();
    }

    useEffect(() =>  { 
        fetchData()
    }, [])


    return (
    <section className=" s-settings-section">  
        <h5>
            Organization
        </h5> 

        <TextInput 
            readonly={true}
            className="mt-2"
            icon="bi-alphabet"
            placeholder="Manager"
            tooltipContent="Manager"
            value={( managerLoader.placeholder == false ? managerLoader.data?.nickname : "") ?? ""} 
            changeValue={() => {}} />

        <TextInput 
            readonly={true}
            className="mt-3"
            icon="bi-people-fill"
            placeholder="Team"
            tooltipContent="Team"
            value={ ( teamLoader.placeholder == false ? teamLoader.data?.name : "") ?? ""}
            changeValue={() => {}} />

        <TextInput 
            readonly={true}
            className="mt-3"
            icon="bi-person-fill-gear"
            placeholder="Role"
            tooltipContent="Users role"
            value={( roleLoader.placeholder == false ? (roleLoader.isEmpty ? "" : EnumService.convertRoleToString(roleLoader.data!)) : "")}
            changeValue={() => {}}/>

        <StandardList className={"mt-5 s-list-bg-transparent"}  content={teamMembersLoader.placeholder == false ? teamMembersLoader.data!.map(user => <div className="">{user.nickname}</div>) : []} title={"Team members"}            />
    </section>
    )
}
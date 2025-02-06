import { useEffect, useState } from "react"
import { Role, Size, Style } from "../../../components/common/button/ButtonProps"
import { Button, StandardList } from "../../../components/ComponentsIndex"
import { ExtendedDataLoader, User } from "../../../data/CommonDataIndex"
import { AccountService } from "../../account-settings/service/AccountService"
import { useLoading, useModal } from "../../../hooks/HooksIndex"
import { UsersSelection } from "./UsersSelection"
import { UserRoleSelection } from "./UserRoleSelection"


export function TeamLeaderCenter() {
    const showModal = useModal()
    const {shouldReload} = useLoading()
    const [teamMembersLoader, setTeamMembersLoader] = useState<ExtendedDataLoader<User[]>>(ExtendedDataLoader.default())
    
    const fetchData = async () => {
        const users = await AccountService.getTeamMembers()
        if(users != null){
            setTeamMembersLoader(ExtendedDataLoader.dataFinishedLoading(teamMembersLoader, users, false))
        }  else {
            setTeamMembersLoader(ExtendedDataLoader.dataFinishedLoading(teamMembersLoader, [], true))
        }
    }

    useEffect(() => {
        fetchData()
    }, [shouldReload])

    return (
        <div className="s-bg-dark rounded ">
            <section className=" s-settings-section">
                <StandardList 
                    className={" s-list-bg-transparent"}  
                    content={teamMembersLoader.placeholder == false ? 
                        [...teamMembersLoader.data!.map(user => <div className="">{user.nickname}</div>)] : []} title={"Team members"}/>
                
                <div className="w-100 mt-5  justify-content-around  d-flex">
                   
                    <Button 
                        role={Role.Primary}
                        size={Size.Medium}
                        style={Style.Filled}
                        title="Save team members"
                        onClick={() => {
                            showModal(
                                <UsersSelection  />,
                                "Select"
                            )
                        }}/>

                    <Button 
                        role={Role.Primary}
                        size={Size.Medium}
                        style={Style.Filled}
                        title="Edit roles"
                        onClick={() => {
                            showModal(
                                <UserRoleSelection  />,
                                "Select"
                            )
                        }}/>
                </div>
            </section>

        </div>
    )
}
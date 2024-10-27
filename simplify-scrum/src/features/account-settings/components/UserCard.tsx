import { useState } from "react"
import Profile from "../../../assets/img/profile.svg"
import { User, UserInfo } from "../../authorization/data/Index"
import { EnumService } from "../../backlog/service/ServiceIndex"
import { Role } from "../../../data/DataIndex"



export function UserCard(){
    const [user, setUser] = useState<UserInfo>(User.default())
    
    return(
        <div className="card bg-dark">
            <img src={Profile} className="card-img-top mb-4"/>
            <div className="card-body d-flex flex-column align-items-center border-top">
                <h3 className="text-cente mb-3">{user.nickname}</h3>
                <h6 className="text-center">{EnumService.convertRoleToString(Role.DevelopmentTeam)}</h6>
            </div>
        </div>
    )
}
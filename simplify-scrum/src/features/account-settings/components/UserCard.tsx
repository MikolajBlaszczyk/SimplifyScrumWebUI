import { useState } from "react"
import Profile from "../../../assets/img/profile.svg"
import { EnumService } from "../../../services/CommonServicesIndex"
import { Role, User, UserInfo  } from "../../../data/CommonDataIndex"



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
import { useEffect, useState } from "react"
import Profile from "../../../assets/img/profile.svg"
import { EnumService } from "../../../services/CommonServicesIndex"
import { ExtendedDataLoader, Role, User, UserInfo  } from "../../../data/CommonDataIndex"
import { AccountService } from "../service/AccountService"
import { useAlert } from "../../../hooks/useAlert"
import { AlertStyle } from "../../alerting/components/Alert"
import { Placeholder } from "../../../components/ComponentsIndex"
import { useLoading } from "../../../hooks/useContexts"



export function UserCard(){
    const showAlert = useAlert()
    const {shouldReload} = useLoading()
    const [userLoader, setUserLoader] = useState<ExtendedDataLoader<User>>(ExtendedDataLoader.default())

    const fetchData = async () => {
        try{
            const user = await AccountService.getInfo()
            if(user != null) {
                setUserLoader(ExtendedDataLoader.dataFinishedLoading(userLoader, user, false))
            } else {
                setUserLoader(ExtendedDataLoader.dataFinishedLoading(userLoader, null, true))
            }
        } catch(error) {
            showAlert(AlertStyle.Danger, "Could not retrieve user information")
            setUserLoader(ExtendedDataLoader.dataFinishedLoading(userLoader, null, true))
        }
    }

    useEffect(()=> {
        fetchData()
    }, [shouldReload])
    
    if(userLoader.placeholder){
        return (
            <div className="card s-bg-dark ">
                <img src={Profile} className="card-img-top mb-4"/>
                <div className=" d-flex flex-column align-items-center border-top">
                    <Placeholder />
                </div>
            </div>
        )
    }

    return(
        <div className=" s-bg-dark-input s-card-user p-3">
            <img src={Profile} className="card-img-top mb-4"/>
            <div className=" mb-3 d-flex flex-column align-items-center border-top`">
                {
                    userLoader.isEmpty == false &&
                    <>
                        <h4 className="text-center mt-3 text-break">{userLoader.getData()!.nickname}</h4>
                        <h6 className="text-center">{EnumService.convertRoleToString(userLoader.getData()!.role)}</h6>
                    </>
                }
               
            </div>
        </div>
    )
}
import { useContext, useEffect, useState } from "react"
import "../../assets/Custom.scss"
import { SimpleUserModel } from "../../authorization/data/User"
import { UserService } from "../service/UserService"



export default function UserScreen(){ 
    const [user, setUser] = useState<SimpleUserModel | null>(null)


    useEffect(() => {
        UserService
            .getInfo()
            .then(data => setUser(data))
            .catch(err => {throw Error()})
        
    }, [])


    return(
        <main className="d-flex w-100 h-100 bg-dark justify-content-center">
            <div className="container-fluid bg-dark-darker h-75 m-5">
                <div className="row">
                    <div className=" col-6">
                        <label>{user?.nickname}</label>
                        <label>{user?.username}</label>
                    </div>
                </div>
            </div>
        </main>
    )
}
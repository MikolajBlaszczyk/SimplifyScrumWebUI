import { useContext, useEffect, useState } from "react"
import "../../Utils/Styles/Custom.scss"
import { Global, UserContext } from "../../Context/UserContext"
import { set } from "react-datepicker/dist/date_utils"
import { SimpleUserModel } from "../../Utils/Models/UserModel"
import { Api } from "../../Services/ApiService"
import { error } from "console"



export default function UserScreen(){ 
    const [user, setUser] = useState<SimpleUserModel | null>(null)

    const userSerivce = Api.Gateway.userService

    useEffect(() => {
        userSerivce
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
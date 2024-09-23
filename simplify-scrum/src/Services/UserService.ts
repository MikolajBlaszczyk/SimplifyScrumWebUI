import axios from "axios"
import { SimpleUserModel } from "../Utils/Models/UserModel"
import { TokenAppender } from "./Auth/TokenAppender";
import App from "../App";

const userApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/user` 


export class UserService extends TokenAppender{
    public async getInfo(){
        this.AppendToken()

        try {
            const url = userApiUrl + "/info"
            const response = await axios.get<SimpleUserModel>(url)

            return response.data
        } catch(error) {
            console.log(error)
            throw error
        }
    }
}
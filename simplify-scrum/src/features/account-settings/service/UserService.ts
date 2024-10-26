import axios from "axios"
import { User } from "../../authorization/data/Index"
import { TokenAppender } from "../../../services/Auth/TokenAppender"

const userApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/user` 


export class UserService{
    public static async getInfo(){
        await TokenAppender.AppendToken()

        try {
            const url = userApiUrl + "/info"
            const response = await axios.get<User>(url)

            return response.data
        } catch(error) {
            console.log(error)
            throw error
        }
    }

    public static async getUsers(){
        await TokenAppender.AppendToken()

        try { 
            const url = userApiUrl + "/users"
            const response = await axios.get(url)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
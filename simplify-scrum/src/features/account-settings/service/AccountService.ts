import axios from "axios"
import { User } from "../../authorization/data/Index"
import { TokenAppender } from "../../../services/auth/TokenAppender"
import { Team } from "../../../data/DataIndex"

const userApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/user` 


export class AccountService{
    static async getInfo(){
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

    static async getUsers(){
        await TokenAppender.AppendToken()

        try { 
            const url = userApiUrl + "/users"
            const response = await axios.get(url)
            console.log(response.data)
            return response.data as User[]
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static getManager(): User { 
        throw Error()
    }

    static getTeam(): Team { 
        throw Error()
    }
}
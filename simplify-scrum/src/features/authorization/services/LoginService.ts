import axios, { HttpStatusCode } from 'axios';
import { TokenHandler } from '../../../services/auth/TokenAppender';
import { User } from '../../../data/CommonDataIndex';
import { RequestFacotry } from '../../../services/api/RequestFactory';

const loginApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}`

export class LoginService{
    
    public static async login(login: string, password: string){
        try {
            var user = User.createLoginUser(login, password)
            var url = loginApiUrl + "/login"
            const response = await RequestFacotry.createUnauthorizedPostRequest(url, user)
            localStorage.setItem("token", response.data)

            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    } 

    public static async isAdminRole(){
        try{
            var url = loginApiUrl + "/isadmin"
            const response = await RequestFacotry.createGetRequest(url)

            return response.status == HttpStatusCode.Ok
        } catch(error) {
            throw error
        }
       
    }

    public static async signIn(login: string, password: string, email: string, nickname: string, role: number){
        try {
            const user = User.createSignInUser(login, password, email, nickname, role)
            const url = loginApiUrl + "/signin"
            const response = await RequestFacotry.createUnauthorizedPostRequest(url, user)
            localStorage.setItem("token", response.data)

            return response
        } catch(error) {
            console.log(error)
            throw error
        }
    }

    public static async logOut() {
        try {
            const url = loginApiUrl + "/logout"
            const response = await RequestFacotry.createGetRequest(url)

            if(response.status == HttpStatusCode.Ok){
                localStorage.removeItem("token")
                TokenHandler.RemoveToken()
                return
            }

            

            throw Error()
        } catch(error) {
            console.log(error)
            throw error
        }

    }
    
}
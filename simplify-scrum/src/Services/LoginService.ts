import axios, { Axios, AxiosResponse } from 'axios';
import { createLoginUser, createSignInUser } from '../Utils/Models/Factory';

const loginApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}`

export class LoginService{
    
    public async login(login: string, password: string){
        var user = createLoginUser(login, password)

        try {
            const response = await axios.post(loginApiUrl + "/login", user)
            localStorage.setItem("token", response.data)

            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    
    } 

    public async signIn(login: string, password: string, email: string, nickname: string, role: number){
        const user = createSignInUser(login, password, email, nickname, role)

        try {
            const response = await axios.post(loginApiUrl + "/signin", user)

            localStorage.setItem("token", response.data)

            return response
        } catch(error) {
            console.log(error)
            throw error
        }
    }
    
}
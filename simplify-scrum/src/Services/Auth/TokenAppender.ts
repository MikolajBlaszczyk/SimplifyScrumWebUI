import axios from "axios"

export abstract class TokenAppender{

    static async AppendToken() {
        if(!axios.defaults.headers.common['Authorization']){
            const token = localStorage.getItem("token")
            axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
        } 
    }

    static async RemoveToken(){
        if(axios.defaults.headers.common['Authorization']){
            axios.defaults.headers.common.Authorization = ""
        }
    }
}
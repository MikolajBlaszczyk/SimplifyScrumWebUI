import axios from "axios"

export abstract class TokenAppender{

    static async AppendToken() {
        if(!axios.defaults.headers.common['Authorization']){
            const token = localStorage.getItem("token")
            axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
        } 
    }
}
import axios from "axios"

export abstract class TokenHandler{



    static async RemoveToken(){
        if(axios.defaults.headers.common['Authorization']){
            axios.defaults.headers.common.Authorization = ""
        }
    }
}
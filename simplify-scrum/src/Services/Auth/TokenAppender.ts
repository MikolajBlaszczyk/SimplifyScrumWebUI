import axios from "axios"

export abstract class TokenAppender{
    protected isFirstRun = true

    protected AppendToken(){
        if(this.isFirstRun){
            const token = localStorage.getItem("token")
            axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
            this.isFirstRun = false
        }
    }
}
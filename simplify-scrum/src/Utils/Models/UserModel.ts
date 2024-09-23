
export class SimpleUserModel {
    username: string = "";
    password: string = "";
    email: string = "";
    nickname: string = "";
    role: number = 0;
    id: string = ""


    constructor(username: string, password: string, email: string = "", nickname: string = "", role: number = 0, id: string = "") {
        this.username = username
        this.password = password
        this.email = email
        this.nickname = nickname
        this.role = role
        this.id = id
    }   

    public CleanSensitiveData() {
        this.password = ""
    }
}

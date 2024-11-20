import { Role } from "./Role"

export interface UserInfo{ 
    username: string
    password: string
    email: string
    nickname: string
    role: Role
    teamGuid: string
    id: string
}

export class User extends Object implements UserInfo {
    username: string = "";
    password: string = "";
    email: string = "";
    nickname: string = "";
    role: Role = Role.DevelopmentTeam;
    teamGuid: string = ""
    id: string = ""


    constructor(username: string, password: string, email: string = "", nickname: string = "", role: number = 0, id: string = "", teamGuid: string = "",) {
        super()
        this.username = username
        this.password = password
        this.email = email
        this.nickname = nickname
        this.role = role
        this.id = id
        this.teamGuid = teamGuid
    }   

    static default(): User {
        return new User('', '', '', 'Test')
    }

    static createLoginUser = (login: string, password: string) => {
        return new User(login, password)
    }
    
    static createSignInUser = (login: string, password: string, email: string, nickname: string, role: number)  => {
        return new User(login, password, email, nickname, role)
    }

    public CleanSensitiveData() {
        this.password = ""
    }

    toString() {
        return this.id
    }
}


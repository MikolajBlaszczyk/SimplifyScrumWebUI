import { Role } from "./Role"

export interface UserInfo{ 
    username: string
    password: string
    email: string
    nickname: string
    role: Role
    teamGuid: string
    id: string
    newUser: boolean
}

export class User extends Object implements UserInfo {
    username: string = "";
    password: string = "";
    email: string = "";
    nickname: string = "";
    role: Role = Role.DevelopmentTeam;
    teamGuid: string = ""
    id: string = ""
    newUser: boolean = false


    constructor(username: string, password: string, email: string = "", nickname: string = "", role: number = 0, id: string = "", teamGuid: string = "", newUser: boolean = false) {
        super()
        this.username = username
        this.password = password
        this.email = email
        this.nickname = nickname
        this.role = role
        this.id = id
        this.teamGuid = teamGuid
        this.newUser = newUser
    }   

    static default(): User {
        return new User('', '', '', '')
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


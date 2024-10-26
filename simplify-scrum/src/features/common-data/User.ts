
export class User extends Object {
    username: string = "";
    password: string = "";
    email: string = "";
    nickname: string = "";
    role: number = 0;
    id: string = ""


    constructor(username: string, password: string, email: string = "", nickname: string = "", role: number = 0, id: string = "") {
        super()
        this.username = username
        this.password = password
        this.email = email
        this.nickname = nickname
        this.role = role
        this.id = id
    }   

    static Default(): User {
        return new User('', '')
    }

    public CleanSensitiveData() {
        this.password = ""
    }

    toString() {
        return this.id
    }
}
export const createLoginUser = (login: string, password: string) => {
    return new User(login, password)
}

export const createSignInUser = (login: string, password: string, email: string, nickname: string, role: number)  => {
    return new User(login, password, email, nickname, role)
}


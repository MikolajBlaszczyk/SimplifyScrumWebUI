import {User} from "./User"

export const createUserToLogin = (login: string, password: string) => {
    return new User(login, password)
}

export const createUserToSignIn = (login: string, password: string, email: string, nickname: string, role: number)  => {
    return new User(login, password, email, nickname, role)
}
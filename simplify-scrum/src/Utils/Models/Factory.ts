import {SimpleUserModel} from "./UserModel"

export const createLoginUser = (login: string, password: string) => {
    return new SimpleUserModel(login, password)
}

export const createSignInUser = (login: string, password: string, email: string, nickname: string, role: number)  => {
    return new SimpleUserModel(login, password, email, nickname, role)
}
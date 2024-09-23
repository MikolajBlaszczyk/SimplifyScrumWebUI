import { useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import { Http2ServerResponse } from 'http2'
import { SimpleUserModel } from '../Utils/Models/UserModel'
import { LoginService } from './LoginService'
import { UserService } from './UserService'

export interface UserServiceResult {
    data: AxiosResponse | null
    loading: boolean
    error: string  | null
    user: SimpleUserModel | null
}

export class ApiService{
    private static _api: ApiService | null;

    private _loginService: LoginService | null = null
    private _userService: UserService | null = null

    private constructor() {}

    public static get Api(){
        if(this._api == null)
            this._api = new ApiService()

        return this._api
    }

    public get loginService(){
        if(this._loginService == null)
            this._loginService = new LoginService()

        return this._loginService
    }

    public get userService(){
        if(this._userService == null)
            this._userService = new UserService()

        return this._userService
    }
}

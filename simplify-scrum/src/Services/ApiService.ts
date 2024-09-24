import { useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import { Http2ServerResponse } from 'http2'
import { SimpleUserModel } from '../Utils/Models/UserModel'
import { LoginService } from './LoginService'
import { UserService } from './UserService'
import { MeetingSerivce } from './MeetingService'

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
    private _meetingService: MeetingSerivce | null = null


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

    public get meetingService(){
        if(this._meetingService == null)
            this._meetingService = new MeetingSerivce()

        return this._meetingService
    }
}

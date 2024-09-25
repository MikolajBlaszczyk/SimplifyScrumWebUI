import axios, { Axios, AxiosResponse } from 'axios'
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

export class Api{
    private static _api: Api | null;

    private _loginService: LoginService | null = null
    private _userService: UserService | null = null
    private _meetingService: MeetingSerivce | null = null


    private constructor() {}

    public static get Gateway(){
        if(this._api == null)
            this._api = new Api()

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

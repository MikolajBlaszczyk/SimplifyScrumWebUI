import { useState } from 'react'
import { createUserToLogin, createUserToSignIn } from '../Utils/Models/Factory'
import axios, { Axios, AxiosResponse } from 'axios'
import { Http2ServerResponse } from 'http2'

export interface UserServiceResult {
    data: AxiosResponse | null
    loading: boolean
    error: string  | null
}

export const useLogin = () => {
    const [data, setData] = useState<AxiosResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const loginToService = async (login: string, password: string) => {
        setLoading(true)
        setError(null)

        const body = createUserToLogin(login, password)

        try {
            const response = await axios.post(`${process.env.REACT_APP_SIMPLIFY_API}/login`, body)
            setData(response)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const result: UserServiceResult = {data, loading ,error}

    return { result , loginToService }
}


export const useSignIn = () => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const signInToSerivce = async (login: string, password: string, email: string, nickname: string, role: number) => {
        setLoading(true)
        setError(null)

        const body = createUserToSignIn(login, password, email, nickname, role)

        try {
            const response = await axios.post(`${process.env.REACT_APP_SIMPLIFY_API}/signin`, body)
            setData(response)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const result: UserServiceResult = {data, loading ,error}
    return { result, signInToSerivce }
}
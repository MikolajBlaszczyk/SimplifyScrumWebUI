import axios, { AxiosInstance, AxiosResponse } from "axios"
import { Type } from "typescript"

export interface SimpleRequest {
    instance: AxiosInstance
    data?: any
    url: string
}

export interface RequestHandler {
    next: RequestHandler
    handle: (req: SimpleRequest) => Promise<AxiosResponse>
}
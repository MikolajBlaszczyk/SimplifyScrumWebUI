import axios from "axios"
import { GetHandler } from "./handlers/GetHandler"
import { TokenHandler } from "./handlers/TokenHandler"
import { PostHandler } from "./handlers/PostHandler"
import { Type } from "typescript"
import { PutHandler } from './handlers/PutHandler';
import { DeleteHandler } from "./handlers/DeleteHandler"

export class RequestFacotry {
    static async createGetRequest(url: string) { 
        const get = new GetHandler()
        const addToken = new TokenHandler(get)
        
        return await addToken.handle({
            instance: axios.create(),
            url: url,
            data: null,
        })
    }

    static async createPostRequest(url: string, data: any) { 
        const get = new PostHandler()
        const addToken = new TokenHandler(get)

        return await addToken.handle({
            instance: axios.create(),
            url: url,
            data: data,
        })
    }

    static async createPutRequest(url: string, data: any) { 
        const put = new PutHandler()
        const addToken = new TokenHandler(put)

        return await addToken.handle({
            instance: axios.create(),
            url: url,
            data: data
        })
    }

    static async createDeleteRequest(url: string, data: any) {
         const deleteH = new DeleteHandler()
         const addToken = new TokenHandler(deleteH)

         return await addToken.handle({
            instance: axios.create(),
            url: url,
            data: data
         })
    }

}
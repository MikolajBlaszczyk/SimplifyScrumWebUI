import axios from "axios"
import { GetHandler } from "./handlers/GetHandler"
import { TokenHandler } from "./handlers/TokenHandler"
import { PostHandler } from "./handlers/PostHandler"
import { Type } from "typescript"
import { PutHandler } from './handlers/PutHandler';
import { DeleteHandler } from "./handlers/DeleteHandler"

export class RequestFactory {
    static async createUnauthorizedGetRequest(url: string) {
        const get = new GetHandler()

        return await get.handle({
            instance: axios.create(),
            url: url,
            data: null,
        })
    }

    static async createGetRequest(url: string) { 
        const get = new GetHandler()
        const addToken = new TokenHandler(get)
        
        return await addToken.handle({
            instance: axios.create(),
            url: url,
            data: null,
        })
    }


    static async createUnauthorizedPostRequest(url: string, data: any) {
        const post = new PostHandler()

        return await post.handle({
            instance: axios.create(),
            url: url,
            data: data,
        })
    }

    static async createPostRequest(url: string, data: any) { 
        const post = new PostHandler()
        const addToken = new TokenHandler(post)

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
         const deleteHandler = new DeleteHandler()
         const addToken = new TokenHandler(deleteHandler)

         return await addToken.handle({
            instance: axios.create(),
            url: url,
            data: data
         })
    }

}
import { RequestHandler, SimpleRequest } from "../ApiRequests";

export class PostHandler implements RequestHandler {
    next: RequestHandler;

    constructor(){
        this.next = null as unknown as RequestHandler
    }

    handle({instance, url, data}: SimpleRequest){
   
        return instance.post(url, data)
    }
}
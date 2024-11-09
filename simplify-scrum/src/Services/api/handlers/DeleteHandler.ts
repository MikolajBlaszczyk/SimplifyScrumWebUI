import { RequestHandler, SimpleRequest } from "../ApiRequests";

export class DeleteHandler implements RequestHandler {
    next: RequestHandler;

    constructor(){
        this.next = null as unknown as RequestHandler
    }

    handle({instance, url, data}: SimpleRequest){
        return instance.delete(url, data)
    }
}
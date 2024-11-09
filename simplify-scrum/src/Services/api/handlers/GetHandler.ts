import { RequestHandler, SimpleRequest } from "../ApiRequests";

export class GetHandler implements RequestHandler {
    next: RequestHandler;

    constructor(){
        this.next = null as unknown as RequestHandler
    }

    handle({instance, url}: SimpleRequest){
        return instance.get(url)
    }
}
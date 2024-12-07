import { RequestHandler, SimpleRequest } from "../ApiRequests";

export class PostHandler implements RequestHandler {
    next: RequestHandler;

    constructor(){
        this.next = null as unknown as RequestHandler
    }

    handle({instance, url, data}: SimpleRequest){
         instance.defaults.headers.post['Content-Type'] = 'application/json';
        return instance.post(url, data)
    }
}
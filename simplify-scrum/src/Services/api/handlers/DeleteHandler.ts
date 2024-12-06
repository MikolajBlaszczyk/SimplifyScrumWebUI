import { Meeting } from "../../../data/CommonDataIndex";
import { RequestHandler, SimpleRequest } from "../ApiRequests";
import { RequestFactory } from '../RequestFactory';

export class DeleteHandler implements RequestHandler {
    next: RequestHandler;

    constructor(){
        this.next = null as unknown as RequestHandler
    }

    handle({instance, url, data}: SimpleRequest){
       
        return instance.delete(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
    }
}

import { RequestHandler, SimpleRequest } from "../ApiRequests";

export class PostHandler implements RequestHandler {
    next: RequestHandler;

    constructor(){
        this.next = null as unknown as RequestHandler
    }

    handle({instance, url, data}: SimpleRequest){
        if (process.env.NODE_ENV === 'development') {
            console.log('Posting data:', data);
        }
         instance.defaults.headers.post['Content-Type'] = 'application/json';
        return instance.post(url, data)
    }
}
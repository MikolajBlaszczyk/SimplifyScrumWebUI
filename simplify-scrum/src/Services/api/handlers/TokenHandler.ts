import { AxiosInstance } from 'axios';
import { RequestHandler, SimpleRequest } from '../ApiRequests';

export class TokenHandler implements RequestHandler{
    next: RequestHandler;
    
    constructor(next: RequestHandler){
        this.next = next
    }
    
    handle({instance, url, data}: SimpleRequest){
        
        if(!instance.defaults.headers.common['Authorization']){
            const token = localStorage.getItem("token")
            instance.defaults.headers.common = {'Authorization': `bearer ${token}`}
        } 

        return this.next.handle({instance, url, data})
    }
    
}
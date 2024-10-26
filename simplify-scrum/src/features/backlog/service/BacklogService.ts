import { ExtendedStatus, Feature, Project, SimpleStatus, StandardStatus, Task } from "../data/DataIndex";
import { Team, User } from '../../common-data/DataIndex'

export class BacklogService{
    
    static getFeatures(): Feature[]{
        throw Error()
    }

    static getTeams(): Team[] {
        throw Error()
    }
    
    static getAssignes(): User[] {
        throw Error()
    }

    static getTasks(): Task[]{
        throw Error()
    }

    static getProjects(): Project[] {
        throw Error()
    }

    static getExtendedState() {
        return Object.values(ExtendedStatus) 
    }

    static getStandardState() {
        return Object.values(StandardStatus) 
    }

    static getSimpleState() {
        return Object.values(SimpleStatus) 
    }
}
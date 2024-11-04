import { ExtendedStatus, Feature, Project, SimpleStatus, StandardStatus, Task } from "../features/backlog/data/DataIndex";
import { Team, User } from '../data/DataIndex'
import { features } from "process";

export class BacklogService{
    
    static getFeatures(): Feature[]{
        return [
            new Feature('123','Feature One', '', ExtendedStatus.New,  2, 'Project guid', 'creator', ''),
            new Feature('234','Feature Two', '', ExtendedStatus.New,  3, 'Project guid', 'creator', ''),
            new Feature('345','Feature Three', '', ExtendedStatus.New,  5, 'Project guid', 'creator', ''),
        ]
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
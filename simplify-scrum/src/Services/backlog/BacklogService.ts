import { ExtendedStatus, Feature, Project, SimpleStatus, StandardStatus, Task } from "../../features/backlog/data/DataIndex";
import { SprintModel, Team, User } from '../../data/CommonDataIndex'
import { features } from "process";
import { RequestFacotry } from "../api/RequestFactory";
import { HttpStatusCode } from "axios";

const sprintApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/sprint` 

export class BacklogService{
    
    static async getSprintInfo(){
        const url = sprintApiUrl + '/info'
        const response = await RequestFacotry.createGetRequest(url)

        if(response.status == HttpStatusCode.Ok){
            response.data = DataMapper.mapDayDate(response.data)
        }
        
        return response.data
    }

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


class DataMapper {
    static mapDayDate = (sprint: SprintModel) => {
        return ({
            ...sprint,
            date: new Date(sprint.end)
        })
    }
}
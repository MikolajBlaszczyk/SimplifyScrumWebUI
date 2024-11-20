import { ExtendedStatus, Feature, Project, SimpleStatus, StandardStatus, Task } from "../../features/backlog/data/DataIndex";
import { Sprint, SprintModel, Team, User } from '../../data/CommonDataIndex'
import { features } from "process";
import { RequestFacotry } from '../api/RequestFactory';
import { AxiosResponse, HttpStatusCode } from "axios";
import { stat } from 'fs';
import { GenericEnumService } from "../enum/GenericEnumService";

const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}` 

export class BacklogService{
    
    static async getSprintInfo(): Promise<Sprint>{
        const url = apiUrl + '/sprint/info'
        const response = await RequestFacotry.createGetRequest(url)

        if(response.status == HttpStatusCode.Ok){
            response.data = DataMapper.mapDayDate(response.data)
        }
        
        return response.data
    }

    static getTeams(): Team[] {
        return []
    }
    
    static getAssignes(): User[] {
        throw Error()
    }

    static async getFeaturesForProject(projectGUID: string): Promise<Feature[]>{
        const url = apiUrl + `/project/features?projectGUID=${projectGUID}`
        const response = await RequestFacotry.createGetRequest(url)
        
        return response.data
    }

    static async addFeature(feature: Feature): Promise<boolean> {
        const url = apiUrl + "/feature/add"
        const response = await RequestFacotry.createPostRequest(url, feature)

        return response.status == HttpStatusCode.Ok
    }

    static async deleteFeature(featureGUID: string): Promise<boolean> {
        const url = apiUrl + `/feature/delete?featureGUID=${featureGUID}`
        const response = await RequestFacotry.createDeleteRequest(url, null)

        return response.status == HttpStatusCode.Ok
    }

    static async getTasksForFeature(featureGUID: string): Promise<Task[]>{
        const url = apiUrl + `/feature/tasks?featureGUID=${featureGUID}`
        const response = await RequestFacotry.createGetRequest(url)

        return response.data
    }

    static async addTask(task: Task): Promise<boolean> {
        const url = apiUrl + "/task/add"
        const response = await RequestFacotry.createPostRequest(url, task)

        return response.status == HttpStatusCode.Ok
    }

    static async deleteTask(taskID: number): Promise<boolean>{
        const url = apiUrl + `/task/delete?taskID=${taskID}`
        const response = await RequestFacotry.createDeleteRequest(url, null)

        return response.status == HttpStatusCode.Ok
    }

    static async getProjects(): Promise<Project[]> {
        const url = apiUrl + '/projects'
        const response = await RequestFacotry.createGetRequest(url)

        return response.data 
    }

    static async addProject(project: Project): Promise<boolean> {
        try{
            const url = apiUrl + "/project/add"
            const response = await RequestFacotry.createPostRequest(url, project)

            return response.status == HttpStatusCode.Ok
        } catch(err) {
            console.log(err)
            return false
        }
        
    } 

    static async deleteProject(projectGUID: string): Promise<boolean> {
        const url = apiUrl + `/project/delete?projectGUID=${projectGUID}`
        const response = await RequestFacotry.createDeleteRequest(url, null)

        return response.status == HttpStatusCode.Ok
    }
    
    static getExtendedState() {
        return Object.values(ExtendedStatus)
    }

    static getStandardState() {
        return Object.keys(StandardStatus).filter(key => isNaN(Number(key)));
    }

    static getSimpleState() {
        return GenericEnumService.getEnumNames(SimpleStatus)
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
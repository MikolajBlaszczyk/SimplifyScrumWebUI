import { ExtendedStatus, Feature, Project, SimpleStatus, StandardStatus, Task } from "../../features/backlog/data/DataIndex";
import { Sprint, SprintModel, Team, User } from '../../data/CommonDataIndex'
import { RequestFactory } from '../api/RequestFactory';
import { HttpStatusCode } from "axios";
import { GenericEnumService } from "../enum/GenericEnumService";

const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}` 

export class BacklogService{

    static async getSprintInfo(): Promise<Sprint>{
        const url = apiUrl + '/sprint/info'
        const response = await RequestFactory.createGetRequest(url)

        if(response.status == HttpStatusCode.Ok){
            response.data = DataMapper.mapDayDate(response.data)
        } else if (response.status == HttpStatusCode.NoContent){
            return null as unknown as Sprint
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
        const response = await RequestFactory.createGetRequest(url)
        
        return response.data
    }

    static async getFeaturesWithStatusForProject(projectGUID: string, status: number): Promise<Feature[]>{
        const url = apiUrl + `/project/features/status?projectGUID=${projectGUID}&status=${status}`
        const response = await RequestFactory.createGetRequest(url)
        
        return response.data
    }

    //TODO: Remove this endpoint after changin usage to getFeaturesWithStatusForProject
    static async getRefinementFeaturesForProject(projectGUID: string): Promise<Feature[]>{
        const url = apiUrl + `/project/features/refinement?projectGUID=${projectGUID}`
        const response = await RequestFactory.createGetRequest(url)
        
        return response.data
    }

    static async getFeature(featureGUID: string): Promise<Feature>{
        const url = apiUrl + `/feature?featureGUID=${featureGUID}`
        const response = await RequestFactory.createGetRequest(url)
        
        return response.data
    }

    static async addFeature(feature: Feature): Promise<boolean> {
        const url = apiUrl + "/feature/add"
        const response = await RequestFactory.createPostRequest(url, feature)

        return response.status == HttpStatusCode.Ok
    }

    static async updateFeature(feature: Feature): Promise<boolean> {
        const url = apiUrl + "/feature/update"
        const response = await RequestFactory.createPostRequest(url, feature)

        return response.status == HttpStatusCode.Ok
    }

    static async deleteFeature(featureGUID: string): Promise<boolean> {
        const url = apiUrl + `/feature/delete?featureGUID=${featureGUID}`
        const response = await RequestFactory.createDeleteRequest(url, null)

        return response.status == HttpStatusCode.Ok
    }

    static async getTasksForFeature(featureGUID: string): Promise<Task[]>{
        const url = apiUrl + `/feature/tasks?featureGUID=${featureGUID}`
        const response = await RequestFactory.createGetRequest(url)

        return response.data
    }

    static async getTask(id: number): Promise<Task> {
        const url = apiUrl + `/task?taskID=${id}`
        const response = await RequestFactory.createGetRequest(url);

        return response.data
    }
  

    static async addTask(task: Task): Promise<boolean> {
        const url = apiUrl + "/task/add"
        const response = await RequestFactory.createPostRequest(url, task)

        return response.status == HttpStatusCode.Ok
    }

    static async updateTask(task: Task): Promise<boolean> {
        const url = apiUrl + "/task/update"
        const response = await RequestFactory.createPostRequest(url, task)

        return response.status == HttpStatusCode.Ok
    }


    static async deleteTask(taskID: number): Promise<boolean>{
        const url = apiUrl + `/task/delete?taskID=${taskID}`
        const response = await RequestFactory.createDeleteRequest(url, null)

        return response.status == HttpStatusCode.Ok
    }

    static async getProjects(): Promise<Project[]> {
        try {
            const url = apiUrl + '/projects'
            const response = await RequestFactory.createGetRequest(url)
          
            if(response.status == 204){
                return [] as unknown as Project[]
            }

            return response.data.map((project: Project) => DataMapper.mapDayDateBacklogItems(project)) 
        } catch(err){
            console.log(err)
            return null as unknown as Project[]
        }
      
    }

    static async getProject(guid: String): Promise<Project> {
        try {
            const url = apiUrl + `/project?projectGUID=${guid}`
            const response = await RequestFactory.createGetRequest(url)

            return DataMapper.mapDayDateBacklogItems(response.data)
        } catch(err) {
            console.log(err)
            return null as unknown as Project
        }
    }

    static async addProject(project: Project): Promise<boolean> {
        try{
            const url = apiUrl + "/project/add"
            const response = await RequestFactory.createPostRequest(url, project)

            return response.status == HttpStatusCode.Ok
        } catch(err) {
            console.log(err)
            return false
        }
        
    } 

    static async updateProject(project: Project): Promise<boolean> {
        try{
            const url = apiUrl + "/project/update"
            const response = await RequestFactory.createPostRequest(url, project)

            return response.status == HttpStatusCode.Ok
        } catch(err) {
            console.log(err)
            return false
        }
        
    } 

    static async deleteProject(projectGUID: string): Promise<boolean> {
        const url = apiUrl + `/project/delete?projectGUID=${projectGUID}`
        const response = await RequestFactory.createDeleteRequest(url, null)

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

    static mapDayDateBacklogItems = (item: any) => {
        return ({
            ...item,
            createdOn: new Date(item.createdOn),
            lastUpdatedOn: new Date(item.lastUpdatedOn)
        }) 
    }
}
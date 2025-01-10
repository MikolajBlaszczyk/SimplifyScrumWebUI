import { Sprint, Plan } from "../../data/CommonDataIndex"
import { Feature, Project } from "../../features/backlog/data/DataIndex"
import { RequestFactory } from "../api/RequestFactory"


const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}` 

export class SprintService {
    static async getCurrentProject(): Promise<Project> {
        try{
            const url = apiUrl + '/project/active'
            const response = await RequestFactory.createGetRequest(url)

            if(response.status === 204){
                return null as unknown as Project
            }

            return response.data
        } catch(e) {
            console.log(e)
            return null as unknown as Project
        }
    }

    static async PlanSprint(plan: Plan): Promise<Sprint>{
        try{
            const url = apiUrl + '/sprint/plan'
            const response  = await RequestFactory.createPostRequest(url, plan)

            return response.data

        } catch(e){
            console.log(e)
            return null as unknown as Sprint;
        }
    }

    static async getSprintActiveItems(): Promise<Feature[]> {
        try{
            const url  = apiUrl + "/sprint/items"
            const response = await RequestFactory.createGetRequest(url)

            return response.data
        } catch(err) {
            console.log(err)
            return []
        }
    }
}
import { RequestFactory } from "../../../services/api/RequestFactory"
import { features } from 'process';


const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}` 

export class RefinementService {
    static async refinedFeature(featureGuid: string, points: number){
        try{
            const url = apiUrl + "/refinement/refined"
            const body = {
                FeatureGuid: featureGuid,
                Points: points
            }
            const response = await RequestFactory.createPostRequest(url, body)

            return response.data
        } catch(error){
            console.log(error)
            return null
        }
    }

    static async splitFeature(featureGuid: string){
        try{
            const url = apiUrl + "/refinement/split"
            const response = await RequestFactory.createPostRequest(url, featureGuid)

            return response.data
        } catch(error){
            console.log(error)
            return null
        }
    }

    static async getMoreInfo(featureGuid: string){
        try{
            const url = apiUrl + "/refinement/require-info"
            const response = await RequestFactory.createPostRequest(url, featureGuid)

            return response.data
        } catch(error){
            console.log(error)

            return null
        }
    }
}
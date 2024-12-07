import { RequestFactory } from "../api/RequestFactory"

const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}` 

export class PermissionService {

    static async isProjectOwner(): Promise<boolean> {
        try{
            const url = apiUrl + '/permission/po'
            const response = await RequestFactory.createGetRequest(url)

            return response.data
        } catch(error) {
            console.log(error)
            return false;
        }
    }
}
import { Team, User} from "../../../data/CommonDataIndex"
import { RequestFacotry as RequestFactory } from "../../../services/api/RequestFactory"

const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}` 


export class AccountService{
    static async getInfo(){
        try {
            const url = apiUrl + "/user/info"
            const response = await RequestFactory.createGetRequest(url)

            return response.data as User
        } catch(error) {
            console.log(error)
            throw error
        }
    }

    static async getUsers(){
        try { 
            const url = apiUrl + "/user/users"
            const response = await RequestFactory.createGetRequest(url)

            return response.data as User[]
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async getTeams(){
        try { 
            const url = apiUrl + "/teams"
            const response = await RequestFactory.createGetRequest(url)

            return response.data as Team[]
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async getTeamMembers(){
        try {
            const url = apiUrl + "/user/team/members"
            const response = await RequestFactory.createGetRequest(url)

            return response.data as User[]

        } catch(error) {
            console.log(error)
            throw error
        }
    }

    static async updateUser(user: User): Promise<User>{
        try {
            const url = apiUrl + "/user/update"
            const response  = await RequestFactory.createPostRequest(url, user)

            return response.data as User
        } catch(error) { 
            console.log(error)
            throw error
        }
    }

    static async addTeam(team: Team): Promise<Team> {
        try{ 
            const url = apiUrl + "/team/add"
            const response = await RequestFactory.createPostRequest(url, team)

            return response.data
        } catch(error) { 
            console.log(error)
            throw error
        }
    }


    static getManager(): User { 
        throw Error()
    }

    static async getTeam(guid: String) { 
         try{ 
            const url = apiUrl + `/team?teamGUID=${guid}`
            const response = await RequestFactory.createGetRequest(url)

            return response.data as Team
        } catch(error) { 
            console.log(error)
            throw error
        }
    }
}
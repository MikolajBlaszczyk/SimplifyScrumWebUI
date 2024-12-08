import {  Retro } from "../../../context/RetroContext"
import { RequestFactory } from "../../../services/api/RequestFactory"
import { SprintNote } from "../data/SprintNote"

const apiUrl = `${process.env.REACT_APP_SIMPLIFY_API}`

export class RetroService {
    static async finishSprint(rate: SprintNote) {
        try{
            const url = `${apiUrl}/sprint/rate`
            const response = await RequestFactory.createPostRequest(url, rate)

            return response.data
        } catch(e) {
            console.log(e)
            return null
        }
    }
}
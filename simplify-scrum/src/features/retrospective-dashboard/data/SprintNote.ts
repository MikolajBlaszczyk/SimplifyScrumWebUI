import { Rating, Retro } from "../../../context/RetroContext";
import { Sprint } from "../../../data/CommonDataIndex";
import { NoteTypeEnum } from "./NoteTypeEnum";

export class SprintNote { 
    id?: number
    value: Retro
    teammateGuid: string
    sprintGuid: string

    constructor(rating: Retro, teammateGuid: string, sprintGuid: string){
        this.value = rating
        this.teammateGuid = teammateGuid
        this.sprintGuid = sprintGuid
    }
}
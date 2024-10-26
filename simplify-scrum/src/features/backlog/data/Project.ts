import { StandardStatus } from "./DataIndex"

export class Project {
    guid: string
    name: string
    description?: string
    state: StandardStatus
    teamGuid: string
    
    constructor(
            guid: string,
            name: string,
            state: StandardStatus,
            teamGuid: string){
        this.guid = guid
        this.name = name
        this.state = state
        this.teamGuid = teamGuid
    }

    static default() {
        return new Project('','', StandardStatus.New, '')
    }
}
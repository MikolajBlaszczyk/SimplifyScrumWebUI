import { StandardStatus } from "./DataIndex"


export class Project {
    guid: string
    name: string
    description?: string
    state: StandardStatus
    teamGuid: string
    createdBy: string
    createdOn: Date
    lastUpdatedBy: string
    lastUpdatedOn: Date
    isActive: boolean = true

    constructor(
            guid: string,
            name: string,
            state: StandardStatus,
            teamGuid: string,
            createdBy: string,
            createdOn: Date,
            lastUpdatedBy: string,
            lastUpdatedOn: Date,
            isActive: boolean,
            description?: string){
        this.guid = guid
        this.name = name
        this.state = state
        this.teamGuid = teamGuid
        this.createdBy = createdBy
        this.createdOn = createdOn
        this.description = description
        this.lastUpdatedBy = lastUpdatedBy
        this.lastUpdatedOn = lastUpdatedOn
        this.isActive = isActive
    }

    static default() {
        return new Project('','', StandardStatus.New, '', '', new Date(), '', new Date(), false, '')
    }
}
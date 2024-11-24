import { ExtendedStatus } from "./DataIndex"

export class Feature extends Object{
    guid: string
    name: string
    description: string
    state: ExtendedStatus
    points: number
    projectGuid: string
    createdBy: string
    createdOn: Date
    lastUpdatedBy: string
    lastUpdatedOn: Date

    constructor(
            guid: string,
            name: string,
            description: string,
            state: ExtendedStatus,
            points: number,
            projectGuid: string,
            createdBy: string,
            createdOn: Date,
            lastUpdatedBy: string,
            lastUpdatedOn: Date){
        super()
        this.guid = guid
        this.name = name
        this.description = description
        this.state = state
        this.points = points
        this.projectGuid = projectGuid
        this.createdBy = createdBy
        this.createdOn = createdOn
        this.lastUpdatedBy = lastUpdatedBy
        this.lastUpdatedOn = lastUpdatedOn
    }

    static default() { 
        return new Feature('', '', '', ExtendedStatus.New, 1, '', '', new Date(), '', new Date())
    }
    
    toString() {
        return this.guid
    }
}
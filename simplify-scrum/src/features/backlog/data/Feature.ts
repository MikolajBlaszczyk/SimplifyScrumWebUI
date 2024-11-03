import { ExtendedStatus } from "./DataIndex"

export class Feature extends Object{
    guid: string
    title: string
    description: string
    state: ExtendedStatus
    points: number
    projectGuid: string
    creator: string
    lastUpdate: string

    constructor(
            guid: string,
            title: string,
            description: string,
            state: ExtendedStatus,
            points: number,
            projectGuid: string,
            creator: string,
            lastUpdate: string){
        super()
        this.guid = guid
        this.title = title
        this.description = description
        this.state = state
        this.points = points
        this.projectGuid = projectGuid
        this.creator = creator 
        this.lastUpdate = lastUpdate
    }

    static default() { 
        return new Feature('', '', '', ExtendedStatus.New, 1, '', '', '')
    }
    
    toString() {
        return this.guid
    }
}
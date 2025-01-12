import { SimpleStatus } from "./DataIndex"


export class Task {
    id: number
    name: string
    state: SimpleStatus
    featureGuid: string
    assignee: string | null
    createdBy: string
    createdOn: Date
    lastUpdatedBy: string
    lastUpdateOn: Date
    
    constructor(
        id: number, 
        name: string,
        state: SimpleStatus,
        featureGuid: string,
        assigneGuid: string,
        createdBy: string,
        createdOn: Date,
        lastUpdatedBy: string,
        lastUpdatedOn: Date
    ) {
        this.id = id
        this.name = name
        this.state = state
        this.featureGuid = featureGuid
        this.assignee = assigneGuid
        this.createdBy = createdBy
        this.createdOn = createdOn
        this.lastUpdatedBy = lastUpdatedBy
        this.lastUpdateOn = lastUpdatedOn
    }

    
    
}
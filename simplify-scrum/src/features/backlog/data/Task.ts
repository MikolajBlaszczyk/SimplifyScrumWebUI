import { SimpleStatus } from "./DataIndex"

export class Task {
    id: number
    name: string
    state: SimpleStatus
    featureGuid: string
    assigneGuid: string
    
    constructor(
        id: number, 
        name: string,
        state: SimpleStatus,
        featureGuid: string,
        assigneGuid: string
    ) {
        this.id = id
        this.name = name
        this.state = state
        this.featureGuid = featureGuid
        this.assigneGuid = assigneGuid
    }
    
}
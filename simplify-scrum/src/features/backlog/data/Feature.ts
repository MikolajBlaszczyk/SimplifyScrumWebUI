import { RefinementState } from '../../../context/RefinementContext';
import { Refinement } from "../../../pages/Refinement"
import { ExtendedStatus, RefinementStatus, Task } from "./DataIndex"

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
    lastUpdateOn: Date
    refinementState: RefinementStatus
    tasks: Task[]

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
            lastUpdatedOn: Date,
            refinementState: RefinementStatus
            ){
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
        this.lastUpdateOn = lastUpdatedOn
        this.refinementState = refinementState
        this.tasks = []
        
    }

  
    
    toString() {
        return this.guid
    }
}
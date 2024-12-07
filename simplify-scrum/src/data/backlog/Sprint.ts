export interface Sprint {
    guid: string
    name: string
    goal: string
    iteration: number
    end: Date
    projectGuid: string
    createdBy: string 
    createdOn: Date 
    lastUpdateBy: string 
    lastUpdatedOn: Date 
}

export class SprintModel implements Sprint { 
    guid: string
    name: string
    goal: string
    iteration: number
    end: Date
    projectGuid: string
    createdBy: string
    createdOn: Date 
    lastUpdateBy: string 
    lastUpdatedOn: Date 

    constructor(guid: string, name: string, goal: string, iteration: number, end: Date, projectGuid: string, createdBy?: string, createdOn?: Date, lastUpdatedBy?: string, lastUpdatedOn?: Date) {
        this.guid = guid
        this.name = name
        this.goal = goal
        this.iteration = iteration
        this.end = end
        this.projectGuid = projectGuid
        this.createdBy = createdBy ?? ''
        this.createdOn = createdOn ?? new Date()
        this.lastUpdateBy = lastUpdatedBy ?? ''
        this.lastUpdatedOn = lastUpdatedOn ?? new Date()
    }

    static default() { 
        return new SprintModel('', '', '', 0, new Date(),'', '', new Date(), '', new Date())
    }
    
    toString() {
        return this.guid
    }

}
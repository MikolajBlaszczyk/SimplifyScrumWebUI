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
    isFinished: boolean
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
    isFinished: boolean

    constructor(guid: string, name: string, goal: string, iteration: number, end: Date, projectGuid: string) {
        this.guid = guid
        this.name = name
        this.goal = goal
        this.iteration = iteration
        this.end = end
        this.projectGuid = projectGuid
        this.createdBy = '' 
        this.createdOn = new Date()
        this.lastUpdateBy =  ''
        this.lastUpdatedOn = new Date()
        this.isFinished = false
    }

    static default() { 
        return new SprintModel('', '', '', 0, new Date(),'')
    }
    
    toString() {
        return this.guid
    }

}
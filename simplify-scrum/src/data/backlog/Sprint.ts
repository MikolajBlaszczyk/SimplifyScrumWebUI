export interface Sprint {
    guid: string
    name: string
    goal: string
    iteration: number
    end: Date
    projectGuid: string
}

export class SprintModel implements Sprint { 
    guid: string
    name: string
    goal: string
    iteration: number
    end: Date
    projectGuid: string

    constructor(guid: string, name: string, goal: string, iteration: number, end: Date, projectGuid: string) {
        this.guid = guid
        this.name = name
        this.goal = goal
        this.iteration = iteration
        this.end = end
        this.projectGuid = projectGuid
    }

    static default() { 
        return new SprintModel('', '', '', 0, new Date(),'')
    }
    
    toString() {
        return this.guid
    }
}
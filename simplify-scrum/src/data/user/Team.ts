export class Team { 
    guid: string 
    name: string
    managerGUID: string

    constructor(guid: string, name: string, managerGuid: string){ 
        this.guid = guid
        this.name = name 
        this.managerGUID = managerGuid
    }

    static default() { 
        return new Team('', 'Team', '')
    }
}
export class Team { 
    guid: string 
    name: string
    managerGuid: string

    constructor(guid: string, name: string, managerGuid: string){ 
        this.guid = guid
        this.name = name 
        this.managerGuid = managerGuid
    }

    static default() { 
        return new Team('', 'Team', '')
    }
}
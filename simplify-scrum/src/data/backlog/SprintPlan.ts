import { Sprint } from "../CommonDataIndex";

export interface SprintPlan {
    sprint: Sprint;
    featureGuids: string[];
}

export class SprintPlanModel implements SprintPlan {
    sprint: Sprint;
    featureGuids: string[];

    constructor(sprint: Sprint, featureGuids: string[]) {
        this.sprint = sprint;
        this.featureGuids = featureGuids;
    }

    
}
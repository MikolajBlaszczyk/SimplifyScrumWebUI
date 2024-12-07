import { Sprint } from "../CommonDataIndex";

export interface Plan {
    sprint: Sprint;
    featureGuids: string[];
}
import { MeetingType } from "./MeetingType";


export interface MeetingModel {
    id: string;
    name: string;
    description: string;
    leaderId: string;
    start: Date;
    duration: Date;
    type: MeetingType;
}

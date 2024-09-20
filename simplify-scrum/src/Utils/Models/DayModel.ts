import { MeetingModel } from "./Scheduling/MeetingModel";


export interface DayModel {
    date: Date;
    meetings: MeetingModel[];
}

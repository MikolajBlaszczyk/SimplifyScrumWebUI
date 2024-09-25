import { DayModel } from "./DayModel";
import { Month } from "./Month";


export interface ScheduleModel {
    month: Month;
    days: DayModel[];
}

export class Schedule implements ScheduleModel {
    
    month: Month;
    days: DayModel[];
    
    public constructor(date: Date) {
       this.month = date.getMonth() as Month
       this.days = []
    }
}
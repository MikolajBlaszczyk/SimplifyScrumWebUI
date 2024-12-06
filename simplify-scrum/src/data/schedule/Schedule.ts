import { DayModel } from "./Day";

export class Schedule implements ScheduleModel {
    month: number;
    days: DayModel[];

    constructor(month: number, days: DayModel[]) {
        this.month = month;
        this.days = days;
    }

    static empty(): Schedule {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();
        const days: DayModel[] = Array.from({ length: daysInMonth }, () => ({} as DayModel));
        return new Schedule(month, days);
    }
    
}
export interface ScheduleModel {
    month: number;
    days: DayModel[];
}


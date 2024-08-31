export enum Month {
    January = 1,
    February = 2, 
    March = 3, 
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9, 
    October = 10,
    November = 11, 
    Decemeber = 12
}

export enum MeetingType {
    daily = 1,
    refinement = 2,
    retrospective = 3,
    planning = 4,
    custom = 5
}

export interface MeetingApi{
    id: string,
    name: string,
    description: string,
    leaderId: string,
    start: Date
    duration: Date
    type: MeetingType
}

export interface DayApi{
    date: Date
    meetings: MeetingApi[]
}

export interface ScheduleApi{
    month: Month,
    days: DayApi[]
}

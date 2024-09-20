import { DayModel } from "../DayModel";
import { Month } from "./Month";


export interface ScheduleModel {
    month: Month;
    days: DayModel[];
}

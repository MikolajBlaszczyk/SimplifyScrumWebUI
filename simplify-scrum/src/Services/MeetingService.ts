import axios, { HttpStatusCode } from "axios";
import { TokenAppender } from "./Auth/TokenAppender";
import { ScheduleModel } from "../Utils/Models/Scheduling/ScheduleModel";
import { MeetingModel } from '../Utils/Models/Scheduling/MeetingModel';
import { STATUS_CODES } from "http";

const meetingApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/meetings` 

export class MeetingSerivce extends TokenAppender{

    public async GetMeetings(){
        try {
            const url = meetingApiUrl + "/current"
            const response = await axios.get<ScheduleModel>(meetingApiUrl)

            return response.data
        } catch(error) { 
            console.log(error)
        }
    }

    public async AddMeeting(model: MeetingModel){
        try {
            const url = meetingApiUrl + "/add"
            const response = await axios.post(url, model);

            return response.status == HttpStatusCode.Ok

        } catch(error) {
            console.log(error)
        }
    }

    public async UpdateMeeting(model: MeetingModel){
        try {
            const url = meetingApiUrl + "/update"
            const response = await axios.post(url, model);

            return response.status == HttpStatusCode.Ok
        } catch(error) {
            console.log(error)
        }
    }

} 
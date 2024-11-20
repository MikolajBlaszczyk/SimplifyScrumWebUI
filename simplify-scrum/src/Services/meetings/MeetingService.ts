import { HttpStatusCode } from "axios";
import { DayModel, Meeting, ScheduleModel } from '../../data/CommonDataIndex';
import { RequestFacotry } from "../api/RequestFactory";

const meetingApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/meetings` 



export class MeetingSerivce{

    public static async GetMeetings(): Promise<ScheduleModel>{
    
        const url = meetingApiUrl + "/current"
        const response = await RequestFacotry.createGetRequest(url)
        
        if(response.status == HttpStatusCode.Ok) {
            response.data.days = response.data.days.map((day:DayModel) => DataMapper.mapDayDate(day))

            return response.data as ScheduleModel
        } 
       
        throw new Error()
    }

    

    public static async Add(meeting: Meeting){
        try {
            const url = meetingApiUrl + "/add"
            const data = DataMapper.createMeetingData(meeting)
            const response = await RequestFacotry.createPostRequest(url,data )

            return response.status == HttpStatusCode.Ok

        } catch(error) {
            console.log(error)
        }
    }

    public static async UpdateMeeting(meeting: Meeting){
        try {
            const url = meetingApiUrl + "/update"
            const data = DataMapper.createMeetingData(meeting)
            const response = await RequestFacotry.createPostRequest(url, data)

            return response.status == HttpStatusCode.Ok
        } catch(error) {
            console.log(error)
        }
    }

    public static async DeleteMeeting(meeting: Meeting){
        try {
            const url = meetingApiUrl + "/delete"
            const response = await RequestFacotry.createDeleteRequest(url, meeting)

            return response.status == HttpStatusCode.Ok
        } catch(error) { 
            console.log(error)
        }
    }
} 

class DataMapper {
    static createMeetingData(meeting: Meeting) {
        return ({
            Identifier: meeting.id,
            Name: meeting.name,
            Description: meeting.description,
            LeaderIdentifier: meeting.leaderId,
            Start: meeting.start.toJSON(),
            Duration: meeting.duration,
            Type: meeting.type,
            UserGuids: meeting.userIdentifiers
        })
    }

    static mapDayDate = (day: DayModel) => {
        return ({
            ...day,
            date: new Date(day.date)
        })
    }
}
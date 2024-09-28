import axios, { HttpStatusCode } from "axios";
import { TokenAppender } from "../../../services/Auth/TokenAppender";
import { DayModel, MeetingModel, ScheduleModel } from '../data/ModelsIndex';

const meetingApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/meetings` 

export class MeetingSerivce{

    public static async GetMeetings(): Promise<ScheduleModel> {
        await TokenAppender.AppendToken()

        const url = meetingApiUrl + "/current"
        const response = await axios.get<ScheduleModel>(url)
        
        if(response.status == HttpStatusCode.Ok) {
            response.data.days = response.data.days.map( (day: DayModel) => ({
                ...day,
                date: new Date(day.date)
            }))

            return response.data
        }

        throw new Error()
    }

    public static async Add(model: MeetingModel){
        TokenAppender.AppendToken()

        try {
            const hours = model.duration.getHours().toString().padStart(2, '0')
            const minutes = model.duration.getMinutes().toString().padStart(2, '0')

            const url = meetingApiUrl + "/add"
            const response = await axios.post(url, {
                Identifier: model.id,
                Name: model.name,
                Description: model.description,
                LeaderIdentifier: model.leaderId,
                Start: model.start.toJSON(),
                Duration: `${hours}:${minutes}:00`,
                Type: model.type,
                UserGuids: model.userIdentifiers
            });

            return response.status == HttpStatusCode.Ok

        } catch(error) {
            console.log(error)
        }
    }

    public static async UpdateMeeting(model: MeetingModel){
        TokenAppender.AppendToken()
        
        try {
            const hours = model.duration.getHours().toString().padStart(2, '0')
            const minutes = model.duration.getMinutes().toString().padStart(2, '0')

            const url = meetingApiUrl + "/update"
            const response = await axios.post(url, {
                Identifier: model.id,
                Name: model.name,
                Description: model.description,
                LeaderIdentifier: model.leaderId,
                Start: model.start.toJSON(),
                Duration: `${hours}:${minutes}:00`,
                Type: model.type,
                UserGuids: model.userIdentifiers
            });

            return response.status == HttpStatusCode.Ok
        } catch(error) {
            console.log(error)
        }
    }

    public static async DeleteMeeting(model: MeetingModel){
        TokenAppender.AppendToken()
        
        try {
            const url = meetingApiUrl + "/delete"
            const response = await axios.delete(url, { data: model})

        } catch(error) { 
            console.log(error)
        }
    }
} 
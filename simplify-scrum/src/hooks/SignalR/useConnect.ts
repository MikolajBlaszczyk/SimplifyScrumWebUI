import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const webAppUrl = `${process.env.REACT_APP_WEB_APP_URL}`;

const meetingHubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${webAppUrl}meetingshub`, {
            accessTokenFactory: () => localStorage.getItem("token") || ""
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

export const useMeetingHubConnect = () => {
    
    const startConnection = async () => {
        try {
            if(meetingHubConnection.state === signalR.HubConnectionState.Disconnected) 
                await meetingHubConnection.start()
            

        } catch (error) { 
            console.error("SignalR Connection Error: ", error);
        }
    }

    useEffect(() => { 

        startConnection();
        
        return () => {
            if(meetingHubConnection.state === signalR.HubConnectionState.Connected)
                meetingHubConnection.stop();
        }

    }, [])
    
    return meetingHubConnection;
}
import { useEffect, useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { Alignment, ArticleLayout, CentralLayout, SideBySideLayout } from "../layouts/LayoutIndex";
import { DayFactory, Month, ScheduleModel } from "../data/CommonDataIndex";
import { MeetingSerivce } from "../services/CommonServicesIndex";
import { useLoading, useSettings } from "../hooks/HooksIndex";
import { NotificationSheet } from "../features/notifications/NotificationIndex";
import { InfoBoard } from "../features/info-board/InfoBoardIndex";
import { ComponentSize } from "../utils/UtilsIndex";


export function InfoCenter(){
    const today = new Date()
    const {settings, setSettings} = useSettings()
    const {shouldReload: isLoading, setShouldReload: setIsLoading} =  useLoading();


    useEffect(() => {
        setSettings({...settings, showNavbar:true})

        
    }, [isLoading])

    return (
        <ArticleLayout sections={
            [
            <InfoBoard/>,
            <div className="d-flex mb-5 flex-column rounded s-bg-dark  overflow-hidden  s-w-80" >
                <div className="d-flex w-100 s-info-center-header pt-3 pb-2 justify-content-center border-2 border-bottom">
                    <h2>Notifications & Meetings</h2>
                </div>
                <div className="d-flex w-100 h">
                    <NotificationSheet />
                    <SimpleCalendar initialDate={today} />
                </div>
            </div>
        ]} />
    )
}
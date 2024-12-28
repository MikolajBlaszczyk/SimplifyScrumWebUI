import { useEffect, useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { Alignment, ArticleLayout, CentralLayout, SideBySideLayout } from "../layouts/LayoutIndex";
import { DayFactory, Month, ScheduleModel } from "../data/CommonDataIndex";
import { MeetingSerivce } from "../services/CommonServicesIndex";
import { useLoading, useSettings } from "../hooks/HooksIndex";
import { NotificationSheet } from "../features/notifications/NotificationIndex";
import { InfoBoard } from "../features/info-board/InfoBoardIndex";
import { ComponentSize } from "../utils/UtilsIndex";
import { StandardHeader } from '../components/common/header/StandardHeader';


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
                <StandardHeader title="Notifications & Meetings"/>
                <div className="d-flex w-100 h">
                    <NotificationSheet />
                    <SimpleCalendar initialDate={today} />
                </div>
            </div>
        ]} />
    )
}
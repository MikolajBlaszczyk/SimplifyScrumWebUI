import { useEffect, useState } from "react";
import SimpleCalendar from "../features/calendar/components/SimpleCalendar";
import { Alignment, ArticleLayout, SideBySideLayout } from "../layouts/LayoutIndex";
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
            <SideBySideLayout 
                rightSide={<SimpleCalendar initialDate={today} />} 
                leftSide={<NotificationSheet />} 
                alignment={Alignment.SideItemLeft} />
        ]} />
    )
}
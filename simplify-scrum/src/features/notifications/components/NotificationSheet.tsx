import { useEffect, useMemo, useState } from "react"
import { DummyNotification, NotificationService } from "../NotificationIndex"
import { NotificationIndicator } from "./NotificationIndicator"

const adjustWidthBasedOnCalendar = () => {
    const calendar = document.querySelector('.react-calendar') as HTMLElement
    if(calendar)
        return calendar.offsetHeight

    return 300
}


export function NotificationSheet(){ 
    const [notifcations, setNotifications] = useState<DummyNotification[]>([])
    const [height, setHeight] = useState(0)
    useEffect(() => {
        setHeight(adjustWidthBasedOnCalendar())
        setNotifications(NotificationService.getNotifications())
    }, [])

    const notificationIndicators = useMemo(() => notifcations.map(notification => {
        return (<NotificationIndicator 
                    notification={notification}/>)
    }), [notifcations]) 

    return (
    <div className="d-flex flex-column w-100 s-notification-sheet" style={{height: `${height}px`}}>
        <div className="d-flex mt-2 w-100 s-notification-sheet-label justify-content-center">
            <h5>
                Notifications
            </h5>
        </div>
        <div className="d-flex w-100 mt-4 justify-content-start flex-column">
            {notificationIndicators}
        </div>
    </div>
    )
}
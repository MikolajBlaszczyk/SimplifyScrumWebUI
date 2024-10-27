import { useEffect, useMemo, useState } from "react"
import { DummyNotification, NotificationService } from "../NotificationIndex"
import { NotificationIndicator } from "./NotificationIndicator"
import { Indicator } from '../../../utils/Index';

export function NotificationSheet(){ 
    const [notifcations, setNotifications] = useState<DummyNotification[]>([])

    useEffect(() => {
        setNotifications(NotificationService.getNotifications())
    }, [])

    const notificationIndicators = useMemo(() => notifcations.map(notification => {
        return (<NotificationIndicator 
                    notification={notification}/>)
    }), [notifcations]) 

    return (
    <div className="d-flex flex-column w-100 h-100 s-notification-sheet">
        <div className="d-flex mt-2 w-100 s-notification-sheet-label justify-content-center">
            <h4>
                Notifications
            </h4>
        </div>
        <div className="d-flex w-100 h-100 justify-content-start flex-column">
            {notificationIndicators}
        </div>
    </div>
    )
}
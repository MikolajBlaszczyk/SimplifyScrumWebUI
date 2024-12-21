import { MouseEvent, useEffect, useMemo, useState } from "react"
import { Notification } from "../../../data/CommonDataIndex"
import { NotificationIndicator } from "./NotificationIndicator"
import { useSettings } from "../../../hooks/useContexts"
import { Button } from "../../../components/ComponentsIndex"
import { Role, Size, Style } from "../../../components/common/button/ButtonProps"

const adjustWidthBasedOnCalendar = () => {
    const calendar = document.querySelector('.react-calendar') as HTMLElement
    if(calendar)
        return calendar.offsetHeight

    return 300
}


export function NotificationSheet(){ 
    const {settings, setSettings} = useSettings()
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [height, setHeight] = useState(0)
 
    const removeAllNotifications = () => {
        setNotifications([]);
        setSettings({ ...settings, notifications: [] });
    };

    const removeNotification = (guid: string) => {
        setSettings({ ...settings, notifications: settings.notifications.filter((notification) => notification.guid !== guid) });
        setNotifications((prev) => prev.filter((notification) => notification.guid !== guid));
      
    };

    const indicators = useMemo(() => {
        return notifications.length === 0 ? (
            <h6>No notifications</h6>
        ) : (
            <>
                <div className="d-flex swipe-indicator">
                    <p>Swipe left to remove a notification</p>
                </div>
                {notifications.map((notification) => (
                    <NotificationIndicator key={notification.guid} notification={notification} removeNotification={removeNotification} />
                ))}
            </>
        );
    }, [notifications]);

    useEffect(() => {
        setHeight(adjustWidthBasedOnCalendar());
        setNotifications(settings.notifications);
    }, [settings.notifications]);

   

    return (
    <div className="d-flex flex-column align-items-center w-100 s-notification-sheet" style={{height: `${height}px`}}>
        <div className="d-flex mt-4  text-center border-bottom s-notification-sheet-label justify-content-center">
            <h4>
                Missed
                Notifications
            </h4>
        </div>
        <div className="d-flex w-100 h-100 mt-4 mb-3 align-items-center overflow-auto justify-content-start flex-column" style={{ maxHeight: '100%'}}>
            { 
                indicators
            }
        </div>
        <div className=" mb-3  d-flex justify-content-center align-items-end">
            <Button 
                role={Role.Cancel}
                size={Size.Large}
                icon="bi-trash"
                onClick={removeAllNotifications}
                style={Style.Filled} />
        </div>
    </div>
    )
}
import { DummyNotification } from "../NotificationIndex"
import { indicationClasses, Indicator } from '../../../utils/Index';

interface Props {
    notification: DummyNotification
}

const notificationBackground = {
    [Indicator.Secondary]: 's-bg-daily',
    [Indicator.Primary]: 's-bg-daily',
    [Indicator.Info]: 's-bg-optional',
    [Indicator.Success]: 's-bg-optional',
    [Indicator.Danger]: 's-bg-critical',
    [Indicator.Warning]: 's-bg-critical'
}

export function NotificationIndicator({notification}: Props){

    

    return (
        <div className={`s-notification-indicator border border-1 ${notificationBackground[notification.type]} mt-3 shadow`}>
            <p className="ms-4 mb-0">
                {notification.title}
            </p>
        </div>
    )
}
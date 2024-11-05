import { DummyNotification } from "../NotificationIndex"
import { indicationClasses, IndicatorColor } from '../../../utils/UtilsIndex';

interface Props {
    notification: DummyNotification
}

const notificationBackground = {
    [IndicatorColor.Secondary]: 's-bg-daily',
    [IndicatorColor.Primary]: 's-bg-daily',
    [IndicatorColor.Info]: 's-bg-optional',
    [IndicatorColor.Success]: 's-bg-optional',
    [IndicatorColor.Danger]: 's-bg-critical',
    [IndicatorColor.Warning]: 's-bg-critical'
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
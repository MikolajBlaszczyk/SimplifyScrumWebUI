import { IndicatorColor } from "../../../utils/UtilsIndex";
import { DummyNotification } from "../NotificationIndex";

export class NotificationService {
    static getNotifications(): DummyNotification[] {
        return [
            {title: 'Notification 1', type: IndicatorColor.Info},
            {title: 'Notification 2', type: IndicatorColor.Danger},
            {title: 'Notification 3', type: IndicatorColor.Secondary},
            {title: 'Notification 4',  type: IndicatorColor.Secondary}
        ]
    }
}
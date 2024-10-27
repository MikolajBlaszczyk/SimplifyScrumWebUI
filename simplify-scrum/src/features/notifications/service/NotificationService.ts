import { Indicator } from "../../../utils/Index";
import { DummyNotification } from "../NotificationIndex";

export class NotificationService {
    static getNotifications(): DummyNotification[] {
        return [
            {title: 'Notification 1', type: Indicator.Info},
            {title: 'Notification 2', type: Indicator.Danger},
            {title: 'Notification 3', type: Indicator.Secondary},
            {title: 'Notification 4',  type: Indicator.Secondary}
        ]
    }
}
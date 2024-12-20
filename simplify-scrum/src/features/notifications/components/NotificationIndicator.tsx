
import { Notification } from "../../../data/CommonDataIndex";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useSettings } from "../../../hooks/useContexts";

interface Props {
    notification: Notification
    removeNotification: (guid: string) => void
}


export function NotificationIndicator({ notification, removeNotification }: Props) {
    const { settings, setSettings } = useSettings();
    const [swipeAmount, setSwipeAmount] = useState(0);
    const [isRemoved, setIsRemoved] = useState(false);
    const rowRef = useRef<HTMLDivElement>(null);

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            if (eventData.deltaX < 0) {
                setSwipeAmount(eventData.deltaX);
            }
        },
        onSwiped: () => {
            if (swipeAmount < -100) {
                setIsRemoved(true);
                removeNotification(notification.guid);
            }
            setSwipeAmount(0);
        },
        trackMouse: true,
    });

    useEffect(() => {
        if (rowRef.current) {
            rowRef.current.style.setProperty("--swipe-amount", `${swipeAmount}px`);
        }
    }, [swipeAmount]);

    return isRemoved ? null : (
        <div
            {...swipeHandlers}
            ref={rowRef}
            style={{
                touchAction: "none",
                userSelect: "none",
                cursor: "grab",
                transform: `translateX(${swipeAmount}px)`,
                transition: swipeAmount === 0 ? "transform 0.3s ease" : "none",
                position: "relative",
            }}
            className={`s-notification-indicator d-flex justify-content-between align-items-center s-bg-primary mt-3 shadow ${swipeAmount !== 0 ? "swiping" : ""}`}
        >
            <h6 className="mb-0">
                {notification.title}
            </h6>
            <i className="bi bi-x-lg remove-icon"></i>
        </div>
    );
}
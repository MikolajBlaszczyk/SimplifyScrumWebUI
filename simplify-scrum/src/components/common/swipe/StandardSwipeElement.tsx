import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { StandardSwipeElementProps } from "../../ComponentsIndex";

export function StandardSwipeElement({content, onSwipeRight, onSwipeLeft, onLeftSwipeContent, onRightSwipeContent}:StandardSwipeElementProps){
    const [swipeAmount, setSwipeAmount] = useState(0);
    const rowRef = useRef<HTMLDivElement>(null);

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            const deltaX = eventData.deltaX;
            if (deltaX > 150) {
                setSwipeAmount(150);
            } else if (deltaX < -150) {
                setSwipeAmount(-150);
            } else {
                setSwipeAmount(deltaX);
            }
        },
        onSwiped: () => {
            if (swipeAmount > 100) {
                onSwipeLeft && onSwipeLeft();
            } else if (swipeAmount < -100) {
                onSwipeRight && onSwipeRight();
            }
            setSwipeAmount(0);
        },
        trackMouse: true
    });

    useEffect(() => {
        if (rowRef.current) {
            rowRef.current.style.setProperty('--swipe-amount', `${swipeAmount}px`);
            rowRef.current.style.setProperty('--before-content', `"${onLeftSwipeContent}"`);
            rowRef.current.style.setProperty('--after-content', `"${onRightSwipeContent}"`);
        }
    }, [swipeAmount, onLeftSwipeContent, onRightSwipeContent]);

    return (
        <div
            {...swipeHandlers}
            ref={rowRef}
            className={`d-flex w-100 bg-transparent swipeable ${swipeAmount !== 0 ? 'swiping' : ''}`}
            style={{
                touchAction: 'none',
                userSelect: 'none',
                cursor: 'grab',
            }}
        >
            {content}
        </div>
    );
}